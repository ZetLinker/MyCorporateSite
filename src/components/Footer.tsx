import React from "react";
import { Box, Typography, Link } from "@mui/material";
import FadeInOnScroll from "./util/FadeInOnScroll";

const Footer: React.FC = () => {
  return (
    <FadeInOnScroll>
      <Box
        sx={{
          textAlign: "center",
          pb: 2,
          backgroundColor: "white", // 背景色を白に設定
          borderTop: { xs: `1px solid black`, sm: `1px solid black` },
          height: { xs: "auto", sm: "auto" }, // 高さを自動調整
          display: "flex", // フレックスレイアウトに設定
          flexDirection: "column", // 垂直方向に要素を並べる
          justifyContent: "center", // 縦方向の中央寄せ
          alignItems: "center", // 横方向の中央寄せ
        }}
      >
        {/* Instagram、公式LINE、プライバシーポリシーのリンクを横並びに */}
        <Box
          sx={{ mt: 5, mb: 3, display: "flex", flexDirection: "row", gap: 2 }}
        >
          <Link
            href="https://www.instagram.com/zetlinker/"
            target="_blank"
            rel="noopener"
            sx={{
              color: "black",
              textDecoration: "none",
              fontSize: { xs: "10px", sm: "12px" },
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Instagram
          </Link>

          <Link
            href="https://lin.ee/Zq5v0Ik"
            target="_blank"
            rel="noopener"
            sx={{
              color: "black",
              textDecoration: "none",
              fontSize: { xs: "10px", sm: "12px" },
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            公式LINE
          </Link>

          <Link
            href="/privacy-policy"
            sx={{
              color: "black",
              textDecoration: "none",
              fontSize: { xs: "10px", sm: "12px" },
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            プライバシーポリシー
          </Link>
        </Box>

        <Typography
          variant="body2"
          className="copyright"
          sx={{
            fontSize: { xs: "10px", sm: "12px" }, // モバイルでフォントサイズを調整
            letterSpacing: {
              xs: "0.1em",
              sm: "0.1em",
            },
          }}
        >
          © ZetLinker All Rights Reserved.
        </Typography>
      </Box>
    </FadeInOnScroll>
  );
};

export default Footer;
