import React from "react";
import { Box } from "@mui/material";

interface AnimatedCirclesProps {
  count?: number;
  duration?: number;
  color?: string;
}

const AnimatedCircles: React.FC<AnimatedCirclesProps> = ({
  count = 12,
  duration = 60,
  color = "rgba(173, 246, 250, 0.1)",
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            zIndex: -1,
            top: "50%",
            right: "-50vw",
            width: { xs: "40%", md: "800px" },
            height: { xs: "40%", md: "400px" },
            backgroundColor: "transparent",
            border: {
              xs: `30px solid ${color.replace("0.1", "0.2")}`,
              md: `30px solid ${color}`,
            },
            borderRadius: "50%",
            display: "flex",
            filter: "blur(50px)",
            justifyContent: "center",
            transform: "translateY(-50%)",
            animation: `moveRandom ${duration}s linear infinite ${index * -4}s`,
            "@keyframes moveRandom": {
              "0%": {
                transform: "translateY(-50%) translateX(0)",
              },
              "100%": {
                transform: "translateY(-50%) translateX(-200vw)",
              },
            },
          }}
        />
      ))}
    </>
  );
};

export default AnimatedCircles;
