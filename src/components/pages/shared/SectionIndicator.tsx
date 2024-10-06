import React from "react";
import { Box, Typography, Fade } from "@mui/material";

interface SectionIndicatorProps {
  sections: string[];
  currentSection: string;
  onIndicatorClick: (section: string) => void;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  currentSection,
  onIndicatorClick,
}) => {
  return (
    <Fade in={currentSection !== "Home"} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          top: { xs: "35%", md: "45%" },
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1000,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {sections.map((section) => (
          <Typography
            key={section}
            onClick={() => onIndicatorClick(section)} // クリックイベントを追加
            sx={{
              color: section === currentSection ? "primary.main" : "#aaa",
              fontWeight: section === currentSection ? "bold" : "normal", // 現在のセクションは太文字
              fontSize:
                section === currentSection
                  ? { xs: "10px", md: "16px" }
                  : { xs: "8px", md: "14px" },
              cursor: "pointer", // カーソルがポインタになるように設定
              transition: "color 0.3s ease, font-size 0.3s ease",
            }}
          >
            {section}
          </Typography>
        ))}
      </Box>
    </Fade>
  );
};

export default SectionIndicator;
