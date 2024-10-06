import React from "react";
import { Box, Typography } from "@mui/material";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const certifications = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified Solutions Architect – Associate",
  "Oracle Certified Java Programmer, SE 11 Silver & Gold",
  "AWS Certified Developer – Associate",
  "AWS Certified DevOps Engineer – Professional",
  "LPIC-1 & LPIC-2: Linux Professional Institute Certification",
  "AWS Certified Database – Specialty",
  "AWS Certified Security – Specialty",
  "AWS Certified Data Analytics – Specialty",
  "AWS Certified Machine Learning – Specialty",
  "AWS Certified Advanced Networking – Specialty",
  "AWS Certified: SAP on AWS – Specialty",
  "Professional Cloud Architect ",
];

const CertificationSection: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        height: "auto",
        display: "flex",
        flexDirection: "column", // 上下方向に要素を並べる
        justifyContent: "center", // 垂直方向の中央寄せ
        alignItems: "center", // 水平方向の中央寄せ
        textAlign: "center", // テキストの中央寄せ
        position: "relative",
        pt: { xs: 10, sm: 15 },
        mb: 15,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 中心に寄せる
          width: "100%",
          height: "100%",
          zIndex: -10,
          mt: { xs: 15, sm: 0 },
        }}
      >
        <BackWave wave={[5, 6]} />
      </Box>

      {/* CERTIFICATION タイトル - 上寄せ */}
      <CustomEffect>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "14px",
              sm: "16px",
            },
            mb: 10,
          }}
        >
          CERTIFICATION
        </Typography>
      </CustomEffect>

      {/* 内容 - 中央寄せ */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // 縦方向に要素を並べる
          justifyContent: "center", // 垂直方向の中央寄せ
          alignItems: "center", // 水平方向の中央寄せ
          height: "100%", // 100%高さに設定
          width: { xs: "80%", sm: "60%" },
          margin: "0 auto", // 中央に配置
          textAlign: "left", // テキストは左寄せ
        }}
      >
        {certifications.map((cert, index) => (
          <CustomEffect key={index}>
            <Typography
              variant="body2"
              sx={{
                mb: 1, // 各行の間にマージンを追加
                fontSize: {
                  xs: "12px",
                  sm: "16px",
                },
              }}
            >
              {cert}
            </Typography>
          </CustomEffect>
        ))}
      </Box>
    </Box>
  );
};

export default CertificationSection;
