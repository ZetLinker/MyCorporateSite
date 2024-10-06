import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const OverlappingCircles: React.FC = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // xs
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // sm
  const isMd = useMediaQuery(theme.breakpoints.up("md")); // md and above

  // Define the size based on the screen size
  const size = isXs
    ? 300
    : isSm
    ? "clamp(500px, 5vw + 500px, 800px)"
    : "clamp(800px, 10vw + 800px, 1200px)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* First Circle */}
      <circle
        cx="100"
        cy="100"
        r="80"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Second Circle */}
      <circle
        cx="110"
        cy="100"
        r="70"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Third Circle */}
      <circle
        cx="120"
        cy="100"
        r="60"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
};

export default OverlappingCircles;
