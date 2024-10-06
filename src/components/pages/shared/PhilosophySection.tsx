import React from "react";
import { Box, Typography } from "@mui/material";
import philosophy_info from "../../../assets/phylosophy_info.png"; // philosophy_info 画像のインポート

const PhilosophySection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        mt: 5,
        py: 5,
        borderRadius: "8px",
        "@media (max-width: 600px)": {
          mt: 4,
          py: 3,
        },
        position: "relative", // Position relative を追加して、絶対位置の子要素を配置可能にする
      }}
    >
      {/* philosophy_info 画像の追加 */}

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "primary.main",
          fontSize: { xs: "20px", md: "inherit" }, // モバイルでは20px、デスクトップではデフォルトのサイズを使用
        }}
      >
        PHILOSOPHY.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          mx: 2,
          position: "absolute",
          left: { xs: "0%", md: "10%" },
          top: { xs: "auto", md: "auto" },
        }}
      >
        <Box
          component="img"
          src={philosophy_info}
          alt="Philosophy Info"
          sx={{
            width: { xs: "20px", md: "40px" },
            height: "auto",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            my: 4,
            "@media (max-width: 600px)": {
              width: "70%",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              fontSize: { xs: "24px", md: "48px" }, // Adjust font size for mobile and desktop
              textAlign: "center",
              position: "relative",
              "&::after": {
                display: "block",
                width: "100%",
                borderColor: "primary.main",
                marginTop: "8px",
              },
            }}
          >
            Information Technology
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "secondary.main",
              fontSize: { xs: "18px", md: "36px" }, // Adjust font size for mobile and desktop
              textAlign: "center",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)", // Center-align relative to "Information Technology"
            }}
          >
            For a Better Time
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#f5d002", // Yellow color for the Japanese text
              fontSize: { xs: "16px", md: "24px" }, // Adjust font size for mobile and desktop
              mt: 2, // Add some margin on top to separate from the previous text
              fontWeight: "bold",
              WebkitTextStroke: "0.1px #666666",
              opacity: 0.9,
            }}
          >
            情報技術でより良い時間を
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PhilosophySection;
