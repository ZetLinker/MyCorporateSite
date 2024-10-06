import React from "react";
import { Box, Typography } from "@mui/material";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const AwardSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "20vh", // セクションの高さを指定
        display: "flex",
        flexDirection: "column", // 上下方向に要素を並べる
        justifyContent: "center", // 垂直方向の中央寄せ
        alignItems: "center", // 水平方向の中央寄せ
        textAlign: "center", // テキストの中央寄せ
        mb: 15,
        relative: "20vh",
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
          mt: { xs: 15, sm: 15 },
        }}
      >
        <BackWave wave={[1, 3]} />
      </Box>

      {/* AWARD タイトル - 上寄せ */}
      <CustomEffect>
        <Typography
          variant="h4"
          sx={{
            pt: { xs: 10, sm: 15 },
            fontWeight: "bold",
            fontSize: {
              xs: "14px",
              sm: "16px",
              lg: "16px",
              xl: "16px",
            },
            mb: 5,
          }}
        >
          AWARD
        </Typography>
      </CustomEffect>

      {/* 内容 - 中央寄せ */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // 縦方向に要素を並べる
          justifyContent: "center", // 垂直方向の中央寄せ
          alignItems: "center", // 水平方向の中央寄せ
          height: "100%", // 100%高さに設定
        }}
      >
        <CustomEffect>
          <Typography
            variant="body1"
            sx={{
              width: "fit-content", // 幅をテキストの内容に合わせる
              whiteSpace: "nowrap", // テキストを1行に強制
              fontSize: {
                xs: "12px",
                sm: "16px",
              },
            }}
          >
            2024 Japan AWS All Certifications Engineers
          </Typography>
        </CustomEffect>
      </Box>
    </Box>
  );
};

export default AwardSection;
