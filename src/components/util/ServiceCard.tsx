import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { underlineAnimationWhite } from "./UnderlineAnimation";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  backgroundColor?: string;
}

const metallicBoxStyles = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" }, // モバイルで縦並びに変更
  width: { xs: "90%", sm: "60%" }, // モバイルで幅を調整
  height: { xs: "auto", sm: "350px" }, // モバイルで高さを調整
  overflow: "hidden",
  zIndex: 5,
  backgroundColor: "#333",
  backgroundImage: "linear-gradient(135deg, #333 25%, #3d3d3d 50%,  #333 75%)",
  backgroundSize: "400% 400%",
  animation: "metallicShine 8s ease-in-out infinite",

  "@keyframes metallicShine": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
  backgroundColor = "#333",
}) => {
  return (
    <Box sx={{ ...metallicBoxStyles }}>
      <Box
        component="img"
        src={imageSrc}
        alt={altText}
        sx={{
          width: { xs: "100%", sm: "65%" }, // モバイルで幅を100%に調整
          height: { xs: "auto", sm: "100%" }, // モバイルで高さを自動調整
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", sm: "35%" }, // モバイルで幅を100%に調整
          color: "#fff",
          textAlign: "center",
          padding: { xs: "20px", sm: "0" }, // モバイルでパディングを追加
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            letterSpacing: "0.1em",
            fontSize: { xs: "18px", sm: "24px" }, // モバイルでフォントサイズを調整
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            fontSize: { xs: "14px", sm: "16px" }, // モバイルでフォントサイズを調整
          }}
        >
          {description}
        </Typography>
        <Button
          variant="text"
          sx={{
            color: "#fff",
            textTransform: "none",
            padding: 0,
            fontWeight: "bold",
            fontSize: { xs: "14px", sm: "16px" }, // モバイルでフォントサイズを調整
            ...underlineAnimationWhite,
          }}
        >
          MORE ▶︎
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceCard;
