import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import house01 from "../../assets/house01.jpg";
import house02 from "../../assets/house02.jpg";
import house03 from "../../assets/house03.jpg";

const images = [house01, house02, house03];

const HomeSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const firstPart = "帰りたくなる、";
  const secondPart = "ココロの故郷。";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5秒ごとに画像を切り替える
    return () => clearInterval(interval);
  }, []);

  const scrollAnimationStyles = {
    scrollLine: {
      width: "1.5px",
      height: { xs: "25px", sm: "40px" },
      backgroundColor: "white",
      position: "relative" as "relative",
      animation: "scrollDown 1.5s infinite",
    },
    scrollDot: {
      width: "10px",
      height: "10px",
      border: "2px solid white",
      borderRadius: "50%",
      position: "absolute" as "absolute",
      bottom: "0px",
      animation: "scrollDownDot 1.5s infinite",
    },
    "@keyframes scrollDown": {
      "0%": { height: "20px" },
      "50%": { height: "40px" },
      "100%": { height: "20px" },
    },
    "@keyframes scrollDownDot": {
      "0%": { bottom: "0px" },
      "50%": { bottom: "20px" },
      "100%": { bottom: "0px" },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1, // 画像がヘッダーの背後に表示されるように設定
        transition: "background-image 1s ease-in-out",
        clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)", // 右下の角を切り取る
      }}
    >
      {/* 中央にテキストを配置 */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1, // 画像の上にテキストを表示
          textAlign: "center",
        }}
      >
        {/* firstPart の表示 */}
        {firstPart.split("").map((char, index) => (
          <Typography
            key={`first-${index}`}
            variant="h3"
            component="span"
            sx={{
              color: "white",
              opacity: 0,
              letterSpacing: "0.1em",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)", // 文字をぼやかす
              filter: "blur(0.5px)", // 文字にぼかしフィルタを適用
              fontSize: { xs: "18px", sm: "36px" },
              animation: `fadeIn 2s ease ${index * 0.2}s forwards`,
            }}
          >
            {char}
          </Typography>
        ))}

        {/* モバイルで改行を追加 */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            height: "18px", // 改行のためのスペース
          }}
        />

        {/* secondPart の表示 */}
        {secondPart.split("").map((char, index) => (
          <Typography
            key={`second-${index}`}
            variant="h3"
            component="span"
            sx={{
              color: "white",
              opacity: 0,
              letterSpacing: "0.1em",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)", // 文字をぼやかす
              filter: "blur(0.5px)", // 文字にぼかしフィルタを適用
              fontSize: { xs: "18px", sm: "36px" },
              animation: `fadeIn 2s ease ${2 + index * 0.2}s forwards`,
            }}
          >
            {char}
          </Typography>
        ))}
      </Box>

      {/* 画像インジケーター */}
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 1, // インジケーターが画像の上に表示されるように設定
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "10px", sm: "15px" },
              height: { xs: "10px", sm: "15px" },
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "white" : "gray",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>

      {/* スクロールアイコン */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5%", // 下からの位置を指定
          left: "50%", // 横位置を中央に
          transform: "translateX(-50%)", // 中央に寄せる
          zIndex: 1, // 画像の上にアイコンを表示
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Box sx={scrollAnimationStyles.scrollLine} />
        <Box sx={scrollAnimationStyles.scrollDot} />
        <Typography
          variant="body1"
          sx={{
            color: "white",
            mb: 1,
            fontSize: "14px",
          }}
        >
          Scroll
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeSlider;
