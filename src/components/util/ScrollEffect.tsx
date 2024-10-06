import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";

interface ScrollEffectProps {
  children: React.ReactNode;
  intensity?: number; // 揺れの強さを調整するプロパティ
  speed?: number; // 揺れのスピードを調整するプロパティ
}

const ScrollEffect: React.FC<ScrollEffectProps> = ({
  children,
  intensity = 15,
  speed = 0.05,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // スムーズに動くために`requestAnimationFrame`を使用してスクロール効果を実装
  const handleScroll = () => {
    if (elementRef.current) {
      const windowHeight = window.innerHeight;
      const rect = elementRef.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      // 要素の中心と画面の中心の差を計算し、それに応じて揺れを設定
      const distanceFromCenter = elementCenter - windowHeight / 2;
      const offset = distanceFromCenter / windowHeight;

      // `ease-in-out`を表現するため、スムーズな動きに変換
      const targetOffsetY = offset * intensity;
      setOffsetY(
        (prevOffsetY) => prevOffsetY + (targetOffsetY - prevOffsetY) * speed
      );
    }

    // アニメーションフレームの再登録
    animationFrameId.current = requestAnimationFrame(handleScroll);
  };

  useEffect(() => {
    // 初期のスクロール監視を開始
    animationFrameId.current = requestAnimationFrame(handleScroll);

    // コンポーネントのアンマウント時に`requestAnimationFrame`をキャンセル
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [intensity, speed]);

  return (
    <Box
      ref={elementRef}
      sx={{
        transform: `translateY(${offsetY}px)`, // Y軸方向の揺れ
        transition: "transform 0.6s ease-in-out", // スムーズな動きを設定
        willChange: "transform", // スクロール時のパフォーマンスを向上させる
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollEffect;
