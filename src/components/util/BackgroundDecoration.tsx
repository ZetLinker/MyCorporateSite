import React from "react";
import { Box } from "@mui/material";

const BackgroundDecoration: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%", // 各要素の中心+上10%に配置
          left: "50%",
          transform: "translate(-50%, -50%)", // 中心に配置し、上に少し移動
          width: "100%", // 各要素の80%を覆う
          height: "100%",
          backgroundColor: {
            xs: "rgba(255, 255, 255, 0.3)",
            sm: "rgba(255, 255, 255, 0.3)",
          },
          zIndex: -2,
          borderRadius: "50%",
          filter: "blur(50px)", // 親要素にblurを適用
          pointerEvents: "none", // ユーザー操作を受け付けない
          overflow: "hidden", // 子コンポーネントの影響を制限
        }}
      >
        {/* 子要素 */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "30%", sm: "30%" },
            width: { xs: "100%", sm: "100%" },
            height: { xs: "30%", sm: "40%" },
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: -1,
            borderRadius: { xs: "60px", sm: "150px" },
          }}
        />
      </Box>
    </>
  );
};

export default BackgroundDecoration;
