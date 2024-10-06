import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import StatementSection from "./shared/StatementSection";
import BusinessProfileSection from "./shared/BusinessProfileSection";
import SectionIndicator from "./shared/SectionIndicator";
import AboutUsMenuSection from "./shared/AboutUsMenuSection";
import OverlappingCircles from "../util/OverlappingCircles";

// セクション名のリスト
const sections = [
  "About Us",
  "Philosophy", // Updated to reflect the new name
  "Business Profile",
];

const AboutUs: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("About Us");

  // 各セクションの参照を設定
  const aboutUsRef = useRef<HTMLElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const businessProfileRef = useRef<HTMLElement | null>(null);

  // スクロール位置に基づいて現在のセクションを設定
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "About Us";

      if (
        businessProfileRef.current &&
        scrollPosition >= businessProfileRef.current.offsetTop
      ) {
        current = "Business Profile";
      } else if (
        philosophyRef.current &&
        scrollPosition >= philosophyRef.current.offsetTop
      ) {
        current = "Philosophy";
      }

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // インジケータークリックで対応するセクションへスクロール
  const scrollToSection = (section: string) => {
    if (section === "About Us") {
      aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Philosophy") {
      philosophyRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Business Profile") {
      businessProfileRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box id="wrapper" sx={{ opacity: 1, overflow: "hidden" }}>
      {/* インジケーター */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" }, // モバイルでは非表示
        }}
      >
        <SectionIndicator
          sections={sections}
          currentSection={currentSection}
          onIndicatorClick={scrollToSection}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "21%",
          right: { xs: "-30%", sm: "-45%" },
          zIndex: 100,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        <OverlappingCircles />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: { xs: "-30%", sm: "-45%" },
          zIndex: 100,
          opacity: 0.5,
          transform: "scaleX(-1)",
          pointerEvents: "none",
        }}
      >
        <OverlappingCircles />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "66%",
          right: { xs: "-30%", sm: "-45%" },
          zIndex: 100,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        <OverlappingCircles />
      </Box>

      {/* 各セクション */}
      <Box ref={aboutUsRef}>
        <AboutUsMenuSection />
      </Box>
      <Box ref={philosophyRef} id="philosophySection">
        <StatementSection />
      </Box>
      <Box ref={businessProfileRef} id="businessProfileSection">
        <BusinessProfileSection />
      </Box>
    </Box>
  );
};

export default AboutUs;
