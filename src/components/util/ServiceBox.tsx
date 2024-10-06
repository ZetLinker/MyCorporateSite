import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

interface ServiceBoxProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({
  image,
  title,
  subtitle,
  description,
  link,
}) => (
  <Box
    className="service_box"
    sx={{
      mb: 5,
      display: "flex",
      justifyContent: { xs: "center", md: "flex-start" }, // モバイル用に中央揃え
      alignItems: "center", // モバイル用に中央揃え
      maxWidth: "850px", // 全体の幅を統一
      mx: "auto", // センター揃えにするために追加
      flexDirection: { xs: "column", md: "row" }, // モバイルで縦並びに変更
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: { xs: "80%", md: "348px" }, // モバイル用に幅を調整
        height: "auto",
        mr: { xs: 0, md: 3 }, // モバイル用にマージン調整
        mb: { xs: 3, md: 0 }, // モバイル用にマージン追加
        mx: { xs: "auto", md: 0 }, // モバイル用に中央揃え
      }}
    />
    <Box
      className="ser_info"
      sx={{
        maxWidth: "500px",
        ml: { xs: 0, md: 6 },
        textAlign: { xs: "center", md: "left" }, // モバイル用に中央揃え
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: { xs: "20px", md: "inherit" }, // モバイル用フォントサイズ調整
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "primary.main",
          mb: 2,
          fontSize: { xs: "16px", md: "inherit" }, // モバイル用フォントサイズ調整
        }}
      >
        {subtitle}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#666",
          mb: 3,
          fontSize: { xs: "14px", md: "inherit" }, // モバイル用フォントサイズ調整
        }}
      >
        {description}
      </Typography>
      <MuiLink
        href={link}
        target="_blank"
        rel="noopener"
        sx={{
          color: "secondary.main",
          fontSize: { xs: "14px", md: "inherit" }, // モバイル用フォントサイズ調整
        }}
      >
        {link}
      </MuiLink>
    </Box>
  </Box>
);

export default ServiceBox;
