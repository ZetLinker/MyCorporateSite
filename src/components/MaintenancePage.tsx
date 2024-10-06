import React from "react";
import { AlertTriangle } from "lucide-react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/logo.svg";

const MaintenancePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column" // 縦方向に配置
      alignItems="center" // 中央揃え
      justifyContent="flex-start" // 上に揃え
      minHeight="100vh"
      bgcolor="grey.100"
      p={{ xs: 2, sm: 4 }} // スマートフォン用のパディング
    >
      <img
        src={logo} // ロゴのパスを指定
        alt="会社ロゴ"
        style={{
          marginTop: "clamp(5rem, 10vw, 10rem)", // 上のマージンをclampで設定
          marginBottom: "clamp(1rem, 2vw, 2rem)", // 下のマージンをclampで設定
          width: "clamp(30px, 15%, 60px)", // 幅をclampで設定
          filter: "grayscale(100%)",
        }}
      />
      <Box
        textAlign="center"
        p={{ xs: 4, sm: 4 }} // スマートフォン用のパディング
        bgcolor="white"
        borderRadius="8px"
        boxShadow={3}
        mt={{ xs: 2, sm: 2 }} // スマートフォン用のマージン
      >
        <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={48} />
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          fontSize={{ xs: "1.5rem", sm: "2rem" }}
        >
          メンテナンス中
        </Typography>
        <Typography
          variant="body1"
          color="black"
          mb={2}
          fontSize={{ xs: "0.9rem", sm: "1rem" }}
        >
          申し訳ございませんが、現在システムのメンテナンス作業を行っております。
        </Typography>
        <Typography
          variant="body1"
          color="black"
          fontSize={{ xs: "0.9rem", sm: "1rem" }}
        >
          作業完了まで今しばらくお待ちください。ご不便をおかけして申し訳ございません。
        </Typography>
      </Box>
    </Box>
  );
};

export default MaintenancePage;
