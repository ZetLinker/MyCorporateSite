import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import WebsiteSection from "./shared/WebSiteSection";
import AppDevelopmentSection from "./shared/AppDevelopmentSection";
import ITSupportSection from "./shared/ITSupportSection";
import ITConsultingSection from "./shared/ITConsultingSection";
import PRSupportSection from "./shared/PRSupportSection";
import ServiceProcessSection from "./shared/ServiceProcessSection";
import SectionIndicator from "./shared/SectionIndicator";
import ServiceMenuSection from "./shared/ServiceMenuSection"; // Import ServiceMenuSection
import OverlappingCircles from "../util/OverlappingCircles";

const sections = [
  "Service",
  "WebSite",
  "Application",
  "Support",
  "Consulting",
  "Promotion",
  "Service Flow",
];

const Service: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("Service");
  const navigate = useNavigate();
  const location = useLocation();
  const serviceSectionRef = useRef<HTMLElement | null>(null);
  const websiteSectionRef = useRef<HTMLElement | null>(null);
  const appDevSectionRef = useRef<HTMLElement | null>(null);
  const supportSectionRef = useRef<HTMLElement | null>(null);
  const consultingSectionRef = useRef<HTMLElement | null>(null);
  const promotionSectionRef = useRef<HTMLElement | null>(null);
  const serviceFlowSectionRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const sectionRefMap: { [key: string]: React.RefObject<HTMLElement> } = {
        service: serviceSectionRef,
        "web-development": websiteSectionRef,
        "app-development": appDevSectionRef,
        "it-support": supportSectionRef,
        consulting: consultingSectionRef,
        "pr-support": promotionSectionRef,
        "service-flow": serviceFlowSectionRef,
      };

      const targetRef = sectionRefMap[sectionId];
      if (targetRef) {
        scrollToSection(targetRef);
      }
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "Service";

      if (serviceFlowSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "Service Flow";
      } else if (promotionSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "Promotion";
      } else if (consultingSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "Consulting";
      } else if (supportSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "Support";
      } else if (appDevSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "Application";
      } else if (websiteSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "WebSite";
      } else if (serviceSectionRef.current?.offsetTop! <= scrollPosition) {
        current = "Service";
      }

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.hash]);

  const handleNavigation = (section: string) => {
    navigate(`/service#${section}`);
  };

  return (
    <Box
      id="wrapper service"
      ref={serviceSectionRef}
      sx={{ opacity: 1, position: "relative", overflow: "hidden" }}
    >
      <Box>
        <Box
          sx={{
            display: { xs: "none", sm: "block" }, // モバイルでは非表示
          }}
        >
          <SectionIndicator
            sections={sections}
            currentSection={currentSection}
            onIndicatorClick={(section) => {
              switch (section) {
                case "Service":
                  scrollToSection(serviceSectionRef);
                  break;
                case "WebSite":
                  scrollToSection(websiteSectionRef);
                  break;
                case "Application":
                  scrollToSection(appDevSectionRef);
                  break;
                case "Support":
                  scrollToSection(supportSectionRef);
                  break;
                case "Consulting":
                  scrollToSection(consultingSectionRef);
                  break;
                case "Promotion":
                  scrollToSection(promotionSectionRef);
                  break;
                case "Service Flow":
                  scrollToSection(serviceFlowSectionRef);
                  break;
                default:
                  break;
              }
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "5%",
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
            top: "23%",
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
            top: "38%",
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
            top: "53%",
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
            top: "67%",
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
            top: "85%",
            right: { xs: "-30%", sm: "-45%" },
            zIndex: 100,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        >
          <OverlappingCircles />
        </Box>

        {/* Insert ServiceMenuSection here */}
        <ServiceMenuSection />

        {/* Sections */}
        <Box id="web-development" ref={websiteSectionRef}>
          <WebsiteSection />
        </Box>
        <Box id="app-development" ref={appDevSectionRef}>
          <AppDevelopmentSection />
        </Box>
        <Box id="it-support" ref={supportSectionRef}>
          <ITSupportSection />
        </Box>
        <Box id="consulting" ref={consultingSectionRef}>
          <ITConsultingSection />
        </Box>
        <Box id="pr-support" ref={promotionSectionRef}>
          <PRSupportSection />
        </Box>
        <Box id="service-flow" ref={serviceFlowSectionRef}>
          <ServiceProcessSection />
        </Box>
      </Box>
    </Box>
  );
};

export default Service;
