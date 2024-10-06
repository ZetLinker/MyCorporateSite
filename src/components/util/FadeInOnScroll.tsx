import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const FadeInOnScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 一度フェードインしたら監視を解除
        }
      },
      {
        threshold: 0.3, // 要素が40%見えたらトリガー
      }
    );

    const currentRef = ref.current; // ref.current の値を変数に保存

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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
      }}
    >
      {children}
    </Box>
  );
};

export default FadeInOnScroll;
