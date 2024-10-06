import React from "react";
import { Box, Typography } from "@mui/material";
import messageImage from "../../../assets/user.png";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const MessageSection: React.FC = () => {
  return (
    <Box
      id="messageSection"
      sx={{
        pt: { xs: 10, sm: 15 },
        position: "relative",
        minHeight: "60vh",
        height: "auto",
        width: "100%", // 画面幅に合わせる
        display: "flex",
        flexDirection: "column", // 親要素を縦方向に配置
        justifyContent: "center", // 縦方向で中央揃え
        alignItems: "center", // 横方向で中央揃え
        textAlign: "center", // テキストをセンター寄せ
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          zIndex: -1,
          mt: { xs: 15, sm: 0 },
        }}
      >
        <BackWave wave={[7]} />
      </Box>

      {/* セクションタイトル: MESSAGE */}
      <CustomEffect>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // 横方向で中央寄せ
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "black",
              fontWeight: "bold",
              mb: 4,
              fontSize: {
                xs: "14px",
                sm: "14px",
                lg: "16px",
                xl: "16px",
              },
            }}
          >
            MESSAGE
          </Typography>
        </Box>
      </CustomEffect>

      {/* メインコンテンツ部分 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // 小さい画面では縦並び、大きい画面では横並び
          alignItems: "center", // 横方向で中央揃え
        }}
      >
        {/* 左側: 画像と名前 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mr: { xs: 0, sm: 5 }, // 小さい画面ではマージンをなくす
            mb: { xs: 4, sm: 0 }, // 小さい画面で下に余白を追加
          }}
        >
          <CustomEffect>
            <img
              src={messageImage}
              alt="Message Image"
              style={{ width: "100px", height: "100px" }} // 画像のサイズ調整
            />
          </CustomEffect>
          <CustomEffect>
            <Typography
              variant="h6"
              sx={{ mt: 2, fontSize: "12px", fontWeight: "bold" }}
            >
              代表: 金原 隆利
            </Typography>
          </CustomEffect>
          <CustomEffect>
            <Typography
              variant="h6"
              sx={{ mt: 2, fontSize: "12px", fontWeight: "bold" }}
            >
              Kanehara Takato
            </Typography>
          </CustomEffect>
        </Box>

        {/* 右側: メッセージ */}
        <Box
          sx={{
            maxWidth: {
              xs: "80%", // モバイルで 80%
              sm: "80%", // デスクトップで 60%
            },
          }}
        >
          <CustomEffect>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: {
                  xs: "16px",
                  sm: "18px",
                  lg: "20px",
                  xl: "20px",
                },
              }}
            >
              人と人が、未来を紡ぐ線になる
            </Typography>
          </CustomEffect>

          <CustomEffect>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                  lg: "16px",
                  xl: "16px",
                },
              }}
            >
              私たちは、地域の皆さまと共に歩みながら、
              <br />
              デジタル技術を活用して企業・個人・地域の成長をサポートします。
              <br />
              ITコンサルティングでの悩み解決から、
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                <br />
              </Box>
              ウェブサイトやアプリ開発を通じた企業の魅力づくりまで、
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                <br />
              </Box>
              お客様の想いを形にしていくお手伝いをいたします。
              <br />
              さらに、日々の運用を安心して続けられるようにサポートし、
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                <br />
              </Box>
              PRを通じて広く魅力を届けます。 つながりを大切に、豊かで
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                <br />
              </Box>
              笑顔あふれる未来を、皆さまと一緒に育んでいきたいと願っています。
            </Typography>
          </CustomEffect>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageSection;
