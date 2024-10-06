import React from "react";
import { Box, Typography } from "@mui/material";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const MissionSection: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        pt: { xs: 10, sm: 15 },
        mb: 5,
        height: "50vh", // セクション全体の高さを50vhに指定
        display: "flex",
        flexDirection: "column", // 縦方向に要素を並べる
        justifyContent: "center", // 下部コンテンツの中央寄せ
        alignItems: "center", // 横方向の中央寄せ
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
          mt: { xs: 10, sm: 5 },
        }}
      >
        <BackWave wave={[11, 12]} />
      </Box>

      {/* MISSION - 上寄せ */}
      <CustomEffect>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "14px",
              sm: "16px",
              lg: "16px",
              xl: "16px",
            },
          }}
        >
          MISSION
        </Typography>
      </CustomEffect>

      {/* テキスト - 垂直中央寄せ */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // 縦方向に配置
          justifyContent: "center", // 垂直方向中央寄せ
          alignItems: "center", // 横方向中央寄せ
          height: "100%", // 高さを全体に設定
          maxWidth: "80%",
        }}
      >
        <CustomEffect>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: {
                xs: "18px",
                sm: "18px",
                lg: "24px",
                xl: "24px",
              },
            }}
          >
            EMPOWER REGION
          </Typography>
        </CustomEffect>
        <CustomEffect>
          <Typography variant="body1">
            地域に寄り添い、ビジネスと人々に持続的な価値を提供する。
          </Typography>
        </CustomEffect>
      </Box>
    </Box>
  );
};

export default MissionSection;
