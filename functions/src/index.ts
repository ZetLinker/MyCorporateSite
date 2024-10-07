import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";
import * as nodemailer from "nodemailer";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import {google} from "googleapis";

// Firestore Admin SDK の初期化
admin.initializeApp();

// CORSの設定
const corsHandler = cors({origin: true});

// Secret Managerのクライアントを初期化
const secretManagerClient = new SecretManagerServiceClient();

// シークレットのバージョンを取得する関数
async function accessSecretVersion(secretName: string): Promise<string> {
  const [version] = await secretManagerClient.accessSecretVersion({
    name: `projects/348782816876/secrets/${secretName}/versions/latest`, // Secretの場所を指定
  });
  const payload = version.payload?.data?.toString();
  if (!payload) {
    throw new Error("Secret payload is empty");
  }
  return payload;
}

// リージョンを指定して関数をデプロイ
export const sendEmail = functions
  .region("asia-northeast1")
  .https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      console.log("Received request body:", JSON.stringify(req.body, null, 2));

      // 送信データを解構して変数に代入
      const {
        company,
        email,
        inquiryType,
        message,
        name,
        subject,
        tel,
        timestamp,
      } = req.body.data;

      // 必須項目のバリデーション（company と tel は必須ではない）
      if (
        !name ||
        !email ||
        !subject ||
        !message ||
        !inquiryType ||
        !timestamp
      ) {
        console.error("Missing required fields");
        res.status(400).json({error: "Missing required fields"});
        return;
      }

      try {
        // smtpPasswordを関数内で取得
        const smtpPassword = await accessSecretVersion("SmtpPassword");

        // XserverのSMTPサーバ設定
        const transporter = nodemailer.createTransport({
          host: "mail1032.onamae.ne.jp",
          port: 465,
          secure: true,
          auth: {
            user: "info@zetlinker.com",
            pass: smtpPassword,
          },
          tls: {
            rejectUnauthorized: false,
            minVersion: "TLSv1",
          },
        });

        // メールオプションの作成
        const mailOptions = {
          from: "info@zetlinker.com", // 送信元アドレス
          to: "zetlinker@gmail.com", // 受信先アドレス
          subject: `お問い合わせ通知: ${subject}`, // 件名
          text: `
            会社名: ${company || "未記入"}
            名前: ${name}
            メール: ${email}
            電話番号: ${tel || "未記入"}
            問い合わせ種別: ${inquiryType}
            メッセージ: ${message}
            タイムスタンプ: ${timestamp}
          `,
        };

        // メールを送信
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).json({data: {message: "Email sent successfully"}});
      } catch (error) {
        // エラーハンドリング
        console.error("Error sending email:", error);
        res.status(500).json({error: "Error sending email"});
      }
    });
  });

// GA4のデータを取得する関数
export const getAnalyticsData = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    try {
      const startDate = data.startDate || "7daysAgo";
      const endDate = data.endDate || "today";

      if (!startDate || !endDate) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Invalid date range."
        );
      }

      const serviceAccountKey = await accessSecretVersion(
        "FirebaseServiceAccountKey"
      );

      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(serviceAccountKey),
        scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
      });

      const analyticsDataClient = google.analyticsdata({
        version: "v1beta",
        auth,
      });

      // 必要なメトリクスを全て追加
      const response = await analyticsDataClient.properties.runReport({
        property: "properties/461671887",
        requestBody: {
          dateRanges: [
            {
              startDate: startDate,
              endDate: endDate,
            },
          ],
          metrics: [
            {name: "activeUsers"}, // アクティブユーザー数
            {name: "screenPageViews"}, // 表示回数
            {name: "newUsers"}, // 新規ユーザー数
            {name: "totalUsers"}, // 総ユーザー数
          ],
          dimensions: [
            {name: "date"}, // 日付ベースのデータ
          ],
        },
      });

      // 1. データが存在しない場合の処理
      if (
        !response.data ||
        !response.data.rows ||
        response.data.rows.length === 0
      ) {
        return {message: "No data available"}; // データがない場合の返答
      }

      // 2. データが空の場合の処理
      if (response.data.rows.length === 0) {
        return {
          message:
            "No analytics data found. Please check your data range or wait for data collection.",
        };
      }

      return response.data.rows;
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);

      // 3. エラーメッセージをクライアントに返す
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching analytics data"
      );
    }
  });
