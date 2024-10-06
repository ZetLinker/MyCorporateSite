import React from "react";
import { Box, Typography } from "@mui/material";

// 共通スタイルの定義
const stepBoxStyle = {
  textAlign: "center",
  minWidth: { xs: "70px", sm: "clamp(90px, 15vw, 150px)" }, // モバイル時はサイズを小さくする
};

const arrowContainerStyle = {
  display: "flex", // フレックスボックスを使用して垂直センター寄せ
  alignItems: "center", // 矢印を垂直方向にセンター寄せ
  justifyContent: "center", // 水平方向も中央寄せ
  width: { xs: "20px", sm: "40px" }, // 矢印の親要素の幅を矢印サイズに合わせる
};

const arrowStyle = {
  width: { xs: "20px", sm: "40px" }, // モバイルでは矢印を小さく
  height: { xs: "20px", sm: "40px" },
  borderTop: { xs: "2px solid black", sm: "3px solid black" }, // 矢印の線を細く
  borderRight: { xs: "2px solid black", sm: "3px solid black" },
  transform: "rotate(45deg)", // 45度傾けて矢印に見せる
  opacity: 0.3,
};

const typographyStyle = {
  color: "black",
  mb: 3,
  fontWeight: "bold",
  fontSize: { xs: "12px", sm: "clamp(16px, 2vw, 18px)" }, // フォントサイズをclampに変更
};

const stepTypographyStyle = {
  fontWeight: "bold",
  fontSize: { xs: "10px", sm: "clamp(14px, 2vw, 16px)" }, // フォントサイズをclampに変更
};

const stepSubtextStyle = {
  mt: 1,
  fontSize: { xs: "10px", sm: "clamp(12px, 1.5vw, 14px)" }, // フォントサイズをclampに変更
};

const ServiceFlow: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 水平方向の中央寄せ
        justifyContent: "center", // 垂直方向の中央寄せ
        mt: 5,
        width: "100%", // フル幅
        margin: "0 auto", // センター寄せ
      }}
    >
      {/* 提供までの流れタイトル */}
      <Typography variant="h6" sx={typographyStyle}>
        提供までの流れ
      </Typography>

      {/* フローのステップ */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // 全体を中央寄せ
          width: { xs: "90%", sm: "60%" }, // モバイルで90%、PCで60%の幅に調整
          margin: "0 auto", // センター寄せ
          mb: 5,
        }}
      >
        {/* STEP 1 */}
        <Box sx={stepBoxStyle}>
          <Typography variant="body1" sx={stepTypographyStyle}>
            ヒアリング
          </Typography>
          <Typography variant="body2" sx={stepSubtextStyle}>
            STEP1
          </Typography>
        </Box>

        {/* 矢印 */}
        <Box sx={arrowContainerStyle}>
          <Box sx={arrowStyle} />
        </Box>

        {/* STEP 2 */}
        <Box sx={stepBoxStyle}>
          <Typography variant="body1" sx={stepTypographyStyle}>
            ご提案
          </Typography>
          <Typography variant="body2" sx={stepSubtextStyle}>
            STEP2
          </Typography>
        </Box>

        {/* 矢印 */}
        <Box sx={arrowContainerStyle}>
          <Box sx={arrowStyle} />
        </Box>

        {/* STEP 3 */}
        <Box sx={stepBoxStyle}>
          <Typography variant="body1" sx={stepTypographyStyle}>
            ご契約
          </Typography>
          <Typography variant="body2" sx={stepSubtextStyle}>
            STEP3
          </Typography>
        </Box>

        {/* 矢印 */}
        <Box sx={arrowContainerStyle}>
          <Box sx={arrowStyle} />
        </Box>

        {/* STEP 4 */}
        <Box sx={stepBoxStyle}>
          <Typography variant="body1" sx={stepTypographyStyle}>
            サービス提供
          </Typography>
          <Typography variant="body2" sx={stepSubtextStyle}>
            STEP4
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceFlow;
