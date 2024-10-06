import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";
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
    name: `projects/451944026720/secrets/${secretName}/versions/latest`, // Secretの場所を指定
  });
  const payload = version.payload?.data?.toString();
  if (!payload) {
    throw new Error("Secret payload is empty");
  }
  return payload;
}

// Gmail APIの認証を行う関数
async function getAuthenticatedClient() {
  try {
    const serviceAccountKey = await accessSecretVersion(
      "FirebaseServiceAccountKey"
    );

    // サービスアカウントキーを使った認証
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(serviceAccountKey),
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });

    // OAuth2クライアントを取得
    const authClient = await auth.getClient();

    // authClientがOAuth2Clientかを確認
    if (!(authClient instanceof google.auth.OAuth2)) {
      throw new Error("Failed to create OAuth2Client");
    }

    return authClient;
  } catch (error) {
    console.error("Failed to authenticate:", error);
    throw new Error("Failed to authenticate");
  }
}

// Gmail APIでメールを送信する関数
async function sendGmail(
  name: string,
  email: string,
  tel: string,
  title: string,
  content: string
) {
  try {
    const authClient = await getAuthenticatedClient();

    // Gmail APIクライアントを初期化
    const gmail = google.gmail({version: "v1", auth: authClient});

    // メールの内容を作成
    const emailContent = `To: kanehara.web@gmail.com
From: your.email@gmail.com
Subject: BaseWebお問い合わせ: ${title}

名前: ${name}
メール: ${email}
電話番号: ${tel}
内容:
${content}`;

    const encodedMessage = Buffer.from(emailContent)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // メールを送信
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// メール送信の処理を行うFirebase Function
export const sendContactEmail = functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      const {name, email, tel, title, content} = req.body;

      try {
        await sendGmail(name, email, tel, title, content);
        console.log("Email sent successfully");
        res.status(200).json({data: {message: "Email sent successfully"}});
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({data: {error: "Error sending email"}});
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
        property: "properties/454763418", // YOUR_PROPERTY_IDをGA4のプロパティIDに置き換えてください
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

      if (!response.data || !response.data.rows) {
        return {message: "No data available."};
      }

      return response.data.rows;
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching analytics data"
      );
    }
  });
