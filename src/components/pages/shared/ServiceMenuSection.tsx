import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import heroImagePc from "../../../assets/hero_pc.webp"; // Background image for PC
import heroImageMb from "../../../assets/hero_mb.webp"; // Background image for mobile
import CircularText from "../../util/CircularText"; // Assuming CircularText component is already available

const ServiceMenuSection: React.FC = () => {
  // State to check if the device is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const backgroundRef = useRef<HTMLDivElement>(null); // Ref for the background

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll-based zoom effect
  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollPosition = window.scrollY;
        // Adjust zoom level based on scroll position (1 is normal, 1.02 is max zoom)
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

  // Menu items for navigation
  const menuItems = [
    { title: "WebSite", link: "/service#web-development" },
    { title: "Application", link: "/service#app-development" },
    { title: "Digital Support", link: "/service#it-support" },
    { title: "Digital Consulting", link: "/service#consulting" },
    { title: "Digital Promotion", link: "/service#pr-support" },
  ];

  // Section titles for the bottom navigation
  const sectionTitles = [
    { title: "ウェブサイト", link: "/service#web-development" },
    { title: "アプリケーション", link: "/service#app-development" },
    { title: "プロモーション", link: "/service#pr-support" },
    { title: "デジタルサポート", link: "/service#it-support" },
    { title: "デジタルコンサル", link: "/service#consulting" },
  ];

  return (
    <Box id="ServiceMenuSection" sx={{ position: "relative" }}>
      <Box
        ref={backgroundRef} // Ref applied to the background box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${isMobile ? heroImageMb : heroImagePc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: { xs: "100vh", sm: "140vh" },
          textAlign: "center",
          transition: "transform 0.2s ease-out", // Smooth transition effect for zoom
        }}
      />
      {/* Centered SERVICE text */}
      <Typography
        variant="h1"
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
        SERVICE
      </Typography>

      {/* Additional Circular Text Elements */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "10%", sm: "15%" },
          left: "20%",
          zIndex: 100,
        }}
      >
        <CircularText
          color="white"
          text="WebSite"
          size={isMobile ? 98 : 166}
          link="/service#web-development"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "25%", sm: "30%" },
          left: "60%",
          zIndex: 100,
        }}
      >
        <CircularText
          color="white"
          text="Application"
          size={isMobile ? 96 : 144}
          link="/service#app-development"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", sm: "50%" },
          left: "10%",
          zIndex: 100,
        }}
      >
        <CircularText
          color="white"
          text="Digital Support"
          size={isMobile ? 124 : 188}
          link="/service#it-support"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "65%", sm: "70%" },
          left: "50%",
          zIndex: 100,
        }}
      >
        <CircularText
          color="white"
          text="Digital Consulting"
          size={isMobile ? 74 : 144}
          link="/service#consulting"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "15%", sm: "15%" },
          left: "80%",
          zIndex: 100,
        }}
      >
        <CircularText
          color="white"
          text="Digital Promotion"
          size={isMobile ? 74 : 144}
          link="/service#pr-support"
        />
      </Box>
      {/* Mobile Menu Section - Only visible on mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            padding: "10px",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // 左寄せ
          }}
        >
          {menuItems.map((item, index) => (
            <MuiLink
              component={RouterLink}
              to={item.link}
              underline="none"
              sx={{
                display: "block",
                color: "gray",
                fontSize: "14px",
                mb: 1,
                position: "relative",
                "&:hover": {
                  color: "primary.main",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "1.5px",
                    backgroundColor: "currentColor",
                    transition: "width 0.6s ease",
                  },
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "1.5px",
                  backgroundColor: "currentColor",
                  transition: "width 0.6s ease",
                },
              }}
              key={index}
            >
              {item.title}
            </MuiLink>
          ))}
          {/* Service Flow link */}
          <MuiLink
            component={RouterLink}
            to="/service#service-flow"
            underline="none"
            sx={{
              display: "block",
              color: "gray",
              fontSize: "14px",
              position: "relative",
              "&:hover": {
                color: "primary.main",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1.5px",
                  backgroundColor: "currentColor",
                  transition: "width 0.6s ease",
                },
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "1.5px",
                backgroundColor: "currentColor",
                transition: "width 0.6s ease",
              },
            }}
          >
            Service Flow
          </MuiLink>
        </Box>
      )}

      {/* CSS for animation */}
      <style>
        {`
            @keyframes moveUpDown {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-3px);
              }
            }
          `}
      </style>
    </Box>
  );
};

export default ServiceMenuSection;
