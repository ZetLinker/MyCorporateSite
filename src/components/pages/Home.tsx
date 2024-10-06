import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import SectionIndicator from "./shared/SectionIndicator";
import HeroSection from "./shared/HeroSection";
import AboutUsSection from "./shared/AboutUsSection";
import AimForSection from "./shared/AimForSection";
import ServiceSection from "./shared/ServiceSection";
import ReliabilitySection from "./shared/ReliabilitySection";
import NewsSection from "./shared/NewsSection";
import RecruitSection from "./shared/RecruitSection";
import ContactSection from "./shared/ContactSection"; // Contactセクションをインポート
import OverlappingCircles from "../util/OverlappingCircles";

const sections = [
  "Home",
  "AboutUs",
  "AimFor",
  "Services",
  "Reliability",
  "News",
  "Recruit",
  "Contact", // Contactセクションを追加
];

const Home: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("Home");
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    Home: null,
    AboutUs: null,
    AimFor: null,
    Services: null,
    Reliability: null,
    News: null,
    Recruit: null,
    Contact: null, // Contactセクションの参照を追加
  });

  // スクロール位置に基づいて現在のセクションを設定
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "Home";

      Object.keys(sectionsRef.current).forEach((section) => {
        const ref = sectionsRef.current[section];
        if (ref && ref.offsetTop <= scrollPosition) {
          current = section;
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // インジケータークリック時に該当セクションへスクロール
  const handleIndicatorClick = (section: string) => {
    const ref = sectionsRef.current[section];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* インジケーターを追加 (モバイルでは非表示) */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" }, // モバイルでは非表示
        }}
      >
        <SectionIndicator
          sections={sections}
          currentSection={currentSection}
          onIndicatorClick={handleIndicatorClick}
        />
      </Box>

      {/* OverlappingCircles */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
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
          top: "30%",
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
          top: "55%",
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
          top: "70%",
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
          top: "90%",
          right: { xs: "-30%", sm: "-45%" },
          zIndex: 100,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        <OverlappingCircles />
      </Box>

      {/* セクションのレンダリング */}
      <div ref={(el) => (sectionsRef.current.Home = el)}>
        <HeroSection />
      </div>
      <div ref={(el) => (sectionsRef.current.AboutUs = el)}>
        <AboutUsSection />
      </div>
      <div ref={(el) => (sectionsRef.current.AimFor = el)}>
        <AimForSection />
      </div>
      <div ref={(el) => (sectionsRef.current.Services = el)}>
        <ServiceSection />
      </div>
      <div ref={(el) => (sectionsRef.current.Reliability = el)}>
        <ReliabilitySection />
      </div>
      <div ref={(el) => (sectionsRef.current.News = el)}>
        <NewsSection />
      </div>
      <div ref={(el) => (sectionsRef.current.Recruit = el)}>
        <RecruitSection />
      </div>
      <div ref={(el) => (sectionsRef.current.Contact = el)}>
        <ContactSection /> {/* Contactセクションを追加 */}
      </div>
    </Box>
  );
};

export default Home;
