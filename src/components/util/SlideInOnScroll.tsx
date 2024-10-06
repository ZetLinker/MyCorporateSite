// SlideInOnScroll.tsx

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface SlideInOnScrollProps {
  children: React.ReactNode;
  direction: "top" | "bottom" | "left" | "right"; // スライドインの方向
}

const SlideInOnScroll: React.FC<SlideInOnScrollProps> = ({
  children,
  direction,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // キーフレームの定義
  const slideInKeyframes = {
    "@keyframes slideInFromTop": {
      from: { transform: "translateY(-100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 },
    },
    "@keyframes slideInFromBottom": {
      from: { transform: "translateY(100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 },
    },
    "@keyframes slideInFromLeft": {
      from: { transform: "translateX(-100%)", opacity: 0 },
      to: { transform: "translateX(0)", opacity: 1 },
    },
    "@keyframes slideInFromRight": {
      from: { transform: "translateX(100%)", opacity: 0 },
      to: { transform: "translateX(0)", opacity: 1 },
    },
  };

  // 方向に応じたアニメーションの設定
  const animationSettings = {
    top: "slideInFromTop 2s ease forwards",
    bottom: "slideInFromBottom 2s ease forwards",
    left: "slideInFromLeft 2s ease forwards",
    right: "slideInFromRight 2s ease forwards",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4, // 要素が40%見えたらトリガー
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        ...slideInKeyframes, // キーフレームの適用
        animation: isVisible ? animationSettings[direction] : "none", // 適切なアニメーションを適用
        position: "relative", // 子要素の配置に影響しないようにrelativeを指定
      }}
    >
      {children}
    </Box>
  );
};

export default SlideInOnScroll;
