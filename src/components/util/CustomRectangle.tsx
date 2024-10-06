import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, SxProps } from "@mui/material";
import { keyframes } from "@emotion/react"; // keyframesをインポート

interface RectangleProps {
  color?: boolean | string;
  size?: {
    width: string | { [key: string]: string };
    height: string | { [key: string]: string };
  };
  backgroundColor?: string;
  direction?: boolean | "leftTop" | "rightTop";
  zIndex?: number;
  title?: string;
  titleSize?: string;
  titleColor?: string;
  description?: string;
  descriptionColor?: boolean | "black";
  children?: React.ReactNode;
  sx?: SxProps;
  animationDirection?: "left" | "right" | "top" | "bottom"; // アニメーション方向
}

// 各アニメーションのkeyframesを定義
const slideInFromLeft = keyframes`
  from { transform: translateX(-10%); opacity: 0; } // -100%から-50%に変更
  to { transform: translateX(0); opacity: 1; }
`;

const slideInFromRight = keyframes`
  from { transform: translateX(10%); opacity: 0; } // 100%から50%に変更
  to { transform: translateX(0); opacity: 1; }
`;

const slideInFromTop = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideInFromBottom = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const CustomRectangle: React.FC<RectangleProps> = ({
  color = "#f2f2f2",
  size = { width: "300px", height: "200px" },
  backgroundColor = "white",
  direction = "rightTop",
  zIndex = 1,
  title,
  titleSize = "20px",
  titleColor = "black",
  description,
  descriptionColor = "black",
  children,
  sx,
  animationDirection, // アニメーション方向を受け取る
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // 20%が表示されたときに発火
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // directionの値に基づいてアニメーションの方向を決定
  const getAnimationDirection = () => {
    if (direction === true) return `${slideInFromLeft} 2s ease forwards`; // 左からスライドイン
    if (direction === false) return `${slideInFromRight} 2s ease forwards`; // 右からスライドイン
    return animations[animationDirection || "left"]; // animationDirectionが指定されていればそれを使用、指定がなければ左からスライドイン
  };

  // アニメーションの設定
  const animations = {
    left: `${slideInFromLeft} 2s ease forwards`,
    right: `${slideInFromRight} 2s ease forwards`,
    top: `${slideInFromTop} 2s ease forwards`,
    bottom: `${slideInFromBottom} 2s ease forwards`,
  };

  const resolvedColor =
    color === true
      ? "#67aac7"
      : color === false
      ? "#e64525"
      : color || "#e4ebeb";

  const resolvedDirection =
    direction === true
      ? "rightTop"
      : direction === false
      ? "leftTop"
      : direction;

  const offset =
    resolvedDirection === "rightTop"
      ? { top: { xs: "-5px", sm: "-8px" }, left: { xs: "5px", sm: "8px" } }
      : { top: { xs: "-5px", sm: "-8px" }, left: { xs: "-5px", sm: "-8px" } };

  const gradient =
    resolvedDirection === "rightTop"
      ? `linear-gradient(to right, white 15%, ${resolvedColor} 100%)`
      : `linear-gradient(to left, white 15%, ${resolvedColor} 100%)`;

  const resolvedDescriptionColor =
    descriptionColor === true
      ? "#67aac7"
      : descriptionColor === false
      ? "#e64525"
      : "black";

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        width: size.width,
        height: size.height,
        zIndex: zIndex,
        ...sx,
        opacity: 0, // 初期状態で透明に設定
        animation: isVisible ? getAnimationDirection() : "none", // アニメーション適用
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: offset.top,
          left: offset.left,
          backgroundColor: "transparent",
          border: { xs: `1px solid black`, sm: `1px solid black` },
          zIndex: zIndex + 1,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: gradient,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: zIndex,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "16px",
        }}
      >
        {title && (
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "18px",
                sm: "clamp(24px, 2.5vw, 30px)",
              },
              color: titleColor,
              textAlign: "left",
              zIndex: zIndex + 30,
            }}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)",
              },
              color: resolvedDescriptionColor,
              textAlign: "left",
              zIndex: zIndex + 30,
            }}
          >
            {description}
          </Typography>
        )}
        {children && <Box mt={2}>{children}</Box>}
      </Box>
    </Box>
  );
};

export default CustomRectangle;
