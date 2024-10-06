import React from "react";
import { Box, Typography } from "@mui/material";
import CustomEffect from "../util/CustomEffect";

const PrivacyPolicy: React.FC = () => {
  return (
    <Box
      sx={{
        padding: { xs: 2, md: 5 },
        width: { xs: "80%", md: "60%" },
        maxWidth: "1000px",
        margin: "0 auto",
        mt: { xs: 10, md: 15 },
        py: 5,
      }}
    >
      <CustomEffect>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 5,
            fontSize: { xs: "14px", md: "16px" }, // プライバシーポリシー: モバイル 14px, PC 16px
          }}
        >
          プライバシーポリシーについて
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          <strong>ZetLinker</strong>
          （以下「当事業」といいます）は、お客様のプライバシーを尊重し、お客様の個人情報を適切に保護することを重要な責務と考えております。当ウェブサイト「[あなたのウェブサイト名]」（以下「本サイト」といいます）では、個人情報保護に関する法令を遵守し、以下の方針に基づき、個人情報を取り扱います。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          1. 個人情報の定義
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          個人情報とは、お客様を識別できる情報を指し、ご住所、お名前、ご年齢、お電話番号、メールアドレス、生年月日、性別等、これらの情報により特定の個人を識別できるものをいいます。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          2. 個人情報の収集
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          当社は、お客様の個人情報を、適法かつ公正な手段により収集いたします。また、アクセスログやクッキーを使用して、個人を特定しない情報を収集することがあります。これらの情報は、本サイトの内容改善や統計分析に使用されます。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          3. 個人情報の利用目的
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          お客様の個人情報は、以下の目的にのみ使用されます。
          <ul>
            <li>商品・サービスの提供</li>
            <li>サポート業務の実施</li>
            <li>マーケティング活動における分析</li>
            <li>その他、お客様の同意を得た目的</li>
          </ul>
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          4. 第三者への提供
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          お客様の個人情報は、次の場合を除き、第三者に開示・提供することはありません。
          <ul>
            <li>お客様の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>業務提携先への提供が必要な場合</li>
          </ul>
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          5. 個人情報の管理
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          当社は、お客様の個人情報を適切に管理し、不正アクセスや漏えいを防止するために必要な措置を講じます。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          6. 個人情報の開示・訂正・削除
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          お客様ご自身の個人情報の確認、訂正、削除を希望される場合は、当社の問い合わせ窓口までご連絡ください。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          7. 本ポリシーの改定
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          当社は、法令の改正や必要に応じて、プライバシーポリシーの内容を適宜見直し、変更することがあります。最新の情報は、本サイトに掲載いたします。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          8. クッキーの使用
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          本サイトでは、クッキーを使用して、お客様の利便性向上やウェブサイトの利用状況分析を行います。クッキーの使用を拒否することも可能ですが、その場合、一部のサービスが利用できない場合があります。
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "12px", md: "14px" },
          }} // タイトル: モバイル 12px, PC 14px
        >
          9. お問い合わせ窓口
        </Typography>
      </CustomEffect>
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: { xs: "10px", md: "12px" } }} // その他: モバイル 10px, PC 12px
        >
          個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください。
          <br />
          Eメール: zetlinker@gmail.com
        </Typography>
      </CustomEffect>
    </Box>
  );
};

export default PrivacyPolicy;
