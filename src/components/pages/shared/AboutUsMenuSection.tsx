import React, { useRef, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CircularText from "../../util/CircularText";
import heroImagePc from "../../../assets/hero_pc.webp"; // PC用の背景画像
import heroImageMb from "../../../assets/hero_mb.webp"; // モバイル用の背景画像

const AboutUsMenuSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // デバイスがモバイルかを確認
  const backgroundRef = useRef<HTMLDivElement>(null); // 背景画像の参照

  // スクロールに応じたズームインエフェクト
  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollPosition = window.scrollY;
        // スクロール位置に応じてズームレベルを設定 (1が通常、1.02が最大ズーム)
        const scale = 1 + scrollPosition * 0.0003;
        backgroundRef.current.style.transform = `scale(${Math.min(
          scale,
          1.02
        )})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // スムーズスクロール用の関数
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box id="AboutUsMenuSection" sx={{ position: "relative" }}>
      {/* 背景画像 */}
      <Box
        ref={backgroundRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: { xs: "100vh", sm: "140vh" },
          backgroundImage: `url(${isMobile ? heroImageMb : heroImagePc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "transform 0.2s ease-out", // ズーム効果のためのスムーズなトランジション
          zIndex: 0,
        }}
      />

      {/* Centered ABOUT US text */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "2rem", sm: "4rem" }, // Responsive font size
          fontWeight: "bold",
          color: "white",
          mb: 4,
          position: "absolute",
          top: { xs: "50%", sm: "40%" },
          left: "50%",
          transform: "translate(-50%, -50%)", // Center the text vertically and horizontally
          zIndex: 10, // Ensure text appears above other elements
        }}
      >
        ABOUT US
      </Typography>

      {/* Philosophy Circular Text */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", sm: "55%" },
          left: { xs: "10%", sm: "15%" },
          zIndex: 100,
          cursor: "pointer",
        }}
        onClick={() => scrollToSection("philosophySection")} // スクロールを直接実行
      >
        <CircularText
          text="Philosophy"
          size={isMobile ? 88 : 143}
          color="white"
        />
      </Box>

      {/* Business Profile Circular Text */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "22%", sm: "18%" },
          right: { xs: "2%", sm: "12%" },
          zIndex: 100,
          cursor: "pointer",
        }}
        onClick={() => scrollToSection("businessProfileSection")} // スクロールを直接実行
      >
        <CircularText
          text="Business Profile"
          size={isMobile ? 146 : 146}
          color="white"
        />
      </Box>
    </Box>
  );
};

export default AboutUsMenuSection;
