import React from "react";
import { Box, Typography } from "@mui/material";

const PhilosophyParts: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        borderRadius: "8px",
      }}
    >
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

export default PhilosophyParts;
