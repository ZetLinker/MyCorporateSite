import React from "react";
import { Box, Typography } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle"; // CustomRectangleをインポート

const StatementSection: React.FC = () => {
  return (
    <Box
      id="philosophySection"
      sx={{
        position: "relative",
        minHeight: { xs: "1300px", sm: "1200px" },
        height: "auto",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 背景のカスタム矩形のレイヤー */}
      <CustomRectangle
        size={{
          width: { xs: "80%", sm: "50%" },
          height: { xs: "100px", sm: "120px" },
        }}
        zIndex={50}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "5%", sm: "5%" },
          left: { xs: "-5%", sm: "-5%" }, // xsではセンター寄せ
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: { xs: "20%", sm: "20%" },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "20px",
                sm: "clamp(24px, 2.5vw, 30px)",
              },
              mx: 2,
              letterSpacing: "0.05em",
            }}
          >
            PHILOSOPHY
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#67aac7",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 2vw, 12px)",
              },
              mx: "16px",
              letterSpacing: "0.05em",
            }}
          >
            - 私たちの理念と価値
          </Typography>
        </Box>
      </CustomRectangle>

      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "320px", sm: "320px" },
        }}
        zIndex={48}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "10%", sm: "13%" },
          left: { xs: "5%", sm: "10%" },
        }}
      >
        {/* テキストを囲むBoxを追加 */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            width: "70%",
            mx: "15%", // 中央に寄せるための左右の余白
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            STATEMENT
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "14px",
                sm: "clamp(10px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            LINK TO REGION
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "12px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 5,
            }}
          >
            デジタルで地域を繋ぎ、未来を紡ぐ
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            MISSION
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 5,
            }}
          >
            地域に寄り添い、 ビジネスと地域に持続的な価値を提供する。
          </Typography>
        </Box>
      </CustomRectangle>

      <CustomRectangle
        color={false}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        zIndex={45}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "30%", sm: "20%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        color={true}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        zIndex={40}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "58%", sm: "45%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        color={false}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        zIndex={30}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "90%", sm: "75%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "320px", sm: "320px" },
        }}
        zIndex={42}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "37%", sm: "37%" },
          right: { xs: "5%", sm: "10%" },
        }}
      >
        {/* テキストを囲むBoxを追加 */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            width: "70%",
            mx: "15%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            VALUE
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "gray",
              textAlign: "left",
              fontSize: {
                xs: "8px",
                sm: "clamp(8px, 1vw, 12px)",
              },
              mb: 2,
            }}
          >
            提供する価値
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            地域との共創
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            地域社会と共に、価値を築いていきます。
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            持続可能な成長サポート
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            お客様の成長を支え、 持続可能なビジネスと社会の発展に寄り添います。
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            ビジョンを実現
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            お客様のビジョンを最適なIT戦略で共に形にします。
          </Typography>
        </Box>
      </CustomRectangle>

      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "380px", sm: "400px" },
        }}
        zIndex={38}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "64%", sm: "61%" },
          left: { xs: "5%", sm: "10%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "10%", sm: "8%" },
            width: "70%",
            mx: "15%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            FIVE SENSE
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "gray",
              textAlign: "left",
              fontSize: {
                xs: "8px",
                sm: "clamp(8px, 1vw, 10px)",
              },
              mb: 2,
            }}
          >
            行動規範
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            01. GET SMILE
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            共に成長し、ポジティブな体験を提供する。
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            02. CREATE VALUE
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            自発的に思考し、価値を創造する。
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            03. EMBRACE CHANGE
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            変化を恐れず、成長のチャンスとして捉える。
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            04. CELEBRATE SUCCESS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            小さな成功も大切にし、喜びを共有する。
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
              mb: 0,
            }}
          >
            05. INSPIRE OTHERS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)", // フォントサイズをレスポンシブに
              },
              mb: 2,
            }}
          >
            他者に影響を与え、共に成長する。
          </Typography>
        </Box>
      </CustomRectangle>
    </Box>
  );
};

export default StatementSection;
