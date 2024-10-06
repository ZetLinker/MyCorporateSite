import React from "react";
import { Box, Typography } from "@mui/material";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const ProfileSection: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        position: "relative",
        height: "auto",
        display: "flex", // フレックスボックスを使用
        flexDirection: "column", // 縦方向に要素を並べる
        justifyContent: "center", // 垂直方向の中央揃え
        alignItems: "center", // 横方向の中央揃え
        textAlign: "center",
        pt: { xs: 10, sm: 15 },
        mb: 5,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 中心に寄せる
          width: "100%",
          height: "100%",
          zIndex: -10,
          mt: { xs: 15, sm: 5 },
        }}
      >
        <BackWave wave={[8, 6, 3]} />
      </Box>

      {/* PROFILE タイトル */}
      <CustomEffect>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 10,
            fontSize: {
              xs: "14px",
              sm: "14px",
              lg: "16px",
              xl: "16px",
            },
          }}
        >
          PROFILE
        </Typography>
      </CustomEffect>

      {/* プロフィール内容 */}
      <CustomEffect>
        <Typography
          variant="body1"
          sx={{
            width: { xs: "80%", sm: "60%" }, // モバイルでは80%、PCでは60%の幅に設定
            maxWidth: {
              xs: "80%", // モバイルで 80%
              sm: "60%", // デスクトップで 60%
            },
            margin: "0 auto", // 中央に配置
            lineHeight: 1.8,
            fontSize: {
              xs: "14px",
              sm: "16px",
            },
          }}
        >
          和歌山出身、1996年生まれ。理学療法士として大阪でキャリアをスタートし、
          多くの患者様の生活をより良くするために全力を尽くしてきました。
          その後、より広い視点から社会に貢献するため、システムエンジニアに転身。
          上京後は、飲食、医療、金融など多岐にわたる業界で、WEBサービスやDXプロジェクトに携わり、
          IT技術の力で社会を支えてきました。2024年10月、地域社会に貢献するため「ZetLinker」を立ち上げました。
        </Typography>
      </CustomEffect>
    </Box>
  );
};

export default ProfileSection;
