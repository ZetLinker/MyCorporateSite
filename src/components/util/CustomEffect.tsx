import React from "react";
import { Box } from "@mui/material";
import FadeInOnScroll from "./FadeInOnScroll";

interface CustomEffectProps {
  children: React.ReactNode;
}

const CustomEffect: React.FC<CustomEffectProps> = ({ children }) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <FadeInOnScroll>
        <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      </FadeInOnScroll>
    </Box>
  );
};

export default CustomEffect;
