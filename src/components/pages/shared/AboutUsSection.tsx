import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import CircularText from "../../util/CircularText";

interface AboutUsSectionProps {
  displayCircularText?: boolean; // CircularTextの表示を制御するためのプロパティ
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  displayCircularText = true, // デフォルトでCircularTextを表示
}) => {
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
      id="aboutUsSection"
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: { xs: "745px", sm: "1000px" },
        height: "auto",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
                sm: "clamp(24px, 2.5vw, 30px)",
              },
              mx: 2,
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
            }}
          >
            ABOUT US
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#e64525",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)",
              },
              mx: "16px",
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
            }}
          >
            - 私たちについて
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
          height: "450px",
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
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "14px",
                sm: "clamp(16px, 1vw, 18px)",
              },
              mb: 5,
            }}
          >
            デジタルの力で地域の未来を織りなし、
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
            より良い時間を紡ぐパートナー
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)",
              },
            }}
          >
            私たちは、地域の皆さまが紡いできたサービスや、日々の暮らしで過ごしている
            充実した時間を何よりも大切にしています。地域が持つ独自の価値や文化を守りつつ、その未来をさらに豊かにするため、デジタルの力を最大限に活用していきます。
          </Typography>
        </Box>
      </CustomRectangle>

      {/* displayCircularTextがtrueの場合のみCircularTextを表示 */}
      {displayCircularText && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: "65%", sm: "55%" },
            left: { xs: "0%", sm: "0%" },
            width: "100%",
            mx: { xs: "5%", sm: "15%" },
            zIndex: 100,
          }}
        >
          <CircularText
            text="ABOUT US" // 表示するテキスト
            link="/about" // クリック時の遷移先パス
            size={isMobile ? 110 : 180} // モバイルでは200、他では350
          />
        </Box>
      )}

      <CustomRectangle
        size={{ width: "105%", height: "300px" }}
        zIndex={2}
        direction={false}
        sx={{
          position: "absolute",
          top: "55%",
          right: "-5%",
        }}
      />
    </Box>
  );
};

export default AboutUsSection;
