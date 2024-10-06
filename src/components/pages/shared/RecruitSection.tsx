import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle"; // CustomRectangleをインポート
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Arrow icon import
import CircularText from "../../util/CircularText";

const RecruitSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      id="recruitSection"
      sx={{
        position: "relative",
        minHeight: { xs: "838px", sm: "970px" },
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
          height: { xs: "120px", sm: "150px" },
        }}
        zIndex={50}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "10%", sm: "10%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            right: { xs: "30%", sm: "30%" },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "18px",
                sm: "clamp(24px, 2.5vw, 30px)", // Responsive font size
              },
              mx: 2,
              letterSpacing: "0.05em",
            }}
          >
            RECRUIT
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#67aac7",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)", // Responsive font size
              },
              mx: "16px",
              letterSpacing: "0.05em",
            }}
          >
            - メンバー募集
          </Typography>
        </Box>
      </CustomRectangle>

      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "350px", sm: "400px" },
        }}
        zIndex={48}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "20%", sm: "25%" },
          left: { xs: "15%", sm: "15%" },
        }}
      >
        {/* テキストを囲むBoxを追加 */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
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
                xs: "14px",
                sm: "clamp(16px, 1vw, 18px)", // Responsive font size
              },
              mb: 5,
            }}
          >
            仲間募集 - Join Us at ZetLinker
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // Responsive font size
              },
            }}
          >
            ZetLinkerでは、地域にデジタルの力を届ける仲間を募集しています。私たちと一緒に、地域社会を支え、未来を紡ぐプロジェクトに参加しませんか？新たな挑戦や成長を目指す方のご応募をお待ちしています。
            <br />
            詳しくはお問い合わせへ
            <Button
              component={Link}
              to="/contact"
              sx={{
                color: "black",
                textTransform: "none",
                display: "inline-flex",
                alignItems: "center",
                padding: 0,
                minWidth: 0,
              }}
            >
              <ArrowForwardIosIcon
                sx={{
                  fontSize: "16px",
                  marginLeft: "4px",
                }}
              />
            </Button>
          </Typography>
        </Box>
      </CustomRectangle>

      {/* 下部の背景ボックス */}
      <CustomRectangle
        size={{
          width: { xs: "100%", sm: "105%" },
          height: { xs: "100px", sm: "150px" },
        }}
        zIndex={47}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "40%", sm: "40%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        size={{
          width: { xs: "80%", sm: "40%" },
          height: { xs: "100px", sm: "200px" },
        }}
        zIndex={46}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "60%", sm: "70%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
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
          top: { xs: "70%", sm: "75%" },
          right: { xs: "0%", sm: "-5%" },
        }}
      />

      {/* Circular Text */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", sm: "50%" },
          left: { xs: "50%", sm: "45%" },
          width: "100%",
          mx: "15%",
          zIndex: 100,
        }}
      >
        <CircularText
          text="RECRUIT " // Display text
          link="/contact" // Click destination path
          size={isMobile ? 120 : 180} // Responsive size
        />
      </Box>
    </Box>
  );
};

export default RecruitSection;
