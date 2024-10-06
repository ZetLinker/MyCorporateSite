import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  useTheme,
} from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import CircularText from "../../util/CircularText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Arrow icon import

const ContactSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const currentSectionRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [hasAnimated]);

  return (
    <Box
      id="contactSection"
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: { xs: "745px", sm: "1160px" },
        height: "auto",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 10,
      }}
    >
      {/* 上部の背景ボックス（薄い色） */}
      <CustomRectangle
        size={{ width: "60%", height: { xs: "120px", sm: "150px" } }}
        zIndex={50}
        direction={false}
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
        }}
      >
        {/* 絶対位置のボックスで囲む */}
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "5%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "18px",
                sm: "clamp(24px, 2.5vw, 30px)", // xsは18px、smではclampでフォントサイズを調整
              },
              mx: 2,
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
            }}
          >
            CONTACT US
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#e64525",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)", // xsは10px、smではclampでフォントサイズを調整
              },
              mx: "16px",
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
            }}
          >
            - 相談窓口
          </Typography>
        </Box>
      </CustomRectangle>
      <CustomRectangle
        color={true}
        size={{ width: "80%", height: "100px" }}
        zIndex={49}
        direction={true}
        sx={{
          position: "absolute",
          top: "20%",
          left: "-5%",
        }}
      />

      {/* 中央のボックス */}
      <CustomRectangle
        color="white"
        size={{
          width: {
            xs: "80%",
            sm: "65%",
            md: "45%",
          },
          height: { xs: "350px", sm: "450px" },
        }}
        zIndex={48}
        direction={false}
        sx={{
          position: "absolute",
          top: "25%",
          left: {
            xs: "15%",
            sm: "35%",
            md: "40%",
          },
        }}
      >
        {/* テキストを囲むBoxを追加 */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            width: "70%",
            mx: "15%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(16px, 1vw, 18px)",
              },
              mb: 5,
            }}
          >
            ウェブサイト制作やアプリ開発のご依頼、デジタルに関するお困りごとがございましたら、
            お気軽にご相談ください。
            <Button
              component={Link}
              to="/contact" // Directs to the /contact route
              sx={{
                color: "black",
                textTransform: "none",
                display: "inline-flex",
                alignItems: "center",
                padding: 0,
                minWidth: 0,
              }}
            >
              <ArrowForwardIosIcon
                sx={{
                  fontSize: { xs: "12px", sm: "16px" },
                  marginLeft: "4px",
                }}
              />
            </Button>
          </Typography>
        </Box>
      </CustomRectangle>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "60%", sm: "50%" },
          left: { xs: "0%", sm: "0%" },
          width: "100%",
          mx: { xs: "5%", sm: "15%" },
          zIndex: 100,
        }}
      >
        <CircularText
          text="CONTACT US " // 表示するテキスト
          link="/contact" // クリック時の遷移先パス
          size={isMobile ? 100 : 192} // モバイルでは200、他では350
        />
      </Box>
      <CustomRectangle
        size={{ width: "105%", height: "300px" }}
        zIndex={2}
        direction={false}
        sx={{
          position: "absolute",
          top: "55%",
          right: "-5%",
        }}
      ></CustomRectangle>
    </Box>
  );
};

export default ContactSection;
