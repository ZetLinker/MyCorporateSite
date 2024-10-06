import React, { useRef } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import CircularText from "../../util/CircularText";
import { Link as RouterLink } from "react-router-dom";

const ServiceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Service information
  const services = [
    {
      number: "01.",
      title: "Create WebSite",
      description: "ウェブサイト事業",
      link: "/service#web-development",
    },
    {
      number: "02.",
      title: "Create Application",
      description: "アプリケーション事業",
      link: "/service#app-development",
    },
    {
      number: "03.",
      title: "Digital Promotion",
      description: "プロモーション事業",
      link: "/service#pr-support",
    },
    {
      number: "04.",
      title: "Digital Consulting",
      description: "デジタルコンサル事業",
      link: "/service#consulting",
    },
    {
      number: "05.",
      title: "Digital Support",
      description: "デジタルサポート事業",
      link: "/service#it-support",
    },
  ];

  return (
    <Box
      id="serviceSection"
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: { xs: "1050px", sm: "1160px" },
        height: "auto",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "20px", sm: "80px 40px" },
      }}
    >
      {/* Background box at the top */}
      <CustomRectangle
        size={{
          width: { xs: "70%", sm: "50%" },
          height: { xs: "120px", sm: "150px" },
        }}
        zIndex={50}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "5%", sm: "5%" },
          right: { xs: "-10%", sm: "-5%" },
        }}
      >
        {/* Title box */}
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "5%",
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
            }}
          >
            SERVICE
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#e64525",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)", // Responsive font size
              },
              mx: 2,
            }}
          >
            - 私たちの提供するサービス
          </Typography>
        </Box>
      </CustomRectangle>

      {/* Additional background rectangles */}
      <CustomRectangle
        color={true}
        size={{
          width: { xs: "90%", sm: "80%" },
          height: { xs: "80px", sm: "100px" },
        }}
        zIndex={49}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "13%", sm: "15%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        size={{
          width: { xs: "60%", sm: "40%" },
          height: { xs: "400px", sm: "700px" },
        }}
        zIndex={48}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "20%", sm: "20%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        size={{
          width: { xs: "100%", sm: "90%" },
          height: { xs: "150px", sm: "200px" },
        }}
        zIndex={47}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "65%", sm: "70%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />

      {/* Services list box */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "25%", sm: "27%" },
          left: { xs: "5%", sm: "25%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          width: { xs: "90%", sm: "90%" },
          mt: { xs: 0, sm: 3 },
        }}
      >
        {services.map((service, index) => (
          <Box
            key={index}
            component={RouterLink}
            to={service.link}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              width: { xs: "80%", sm: "50%" },
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
              "&:hover .title": {
                "&::after": {
                  width: "105%",
                },
              },
            }}
          >
            {/* Number box */}
            <CustomRectangle
              color="white"
              size={{
                width: { xs: "50px", sm: "70px" },
                height: { xs: "50px", sm: "70px" },
              }}
              zIndex={50}
              direction={true}
              sx={{
                position: "absolute",
                top: { xs: "-5%", sm: "-10%" },
                left: { xs: "-20px", sm: "-40px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "12px", sm: "14px", md: "14px" },
                  color: "black",
                  mb: 4,
                  ml: 1.5, // 反対に変更
                }}
              >
                {service.number}
              </Typography>
            </CustomRectangle>

            {/* Title and description box */}
            <CustomRectangle
              color="white"
              size={{
                width: { xs: "100%", sm: "100%" },
                height: { xs: "80px", sm: "100px" },
              }}
              zIndex={49}
              direction={true}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: { xs: "4px", sm: "8px" },
                position: "relative",
                minWidth: { xs: "200px", sm: "300px" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "15%",
                  left: "30%",
                }}
              >
                <Typography
                  variant="h6"
                  className="title"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "14px", sm: "16px" },
                    textAlign: "left",
                    mb: 0.5,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "0%",
                      height: "1.5px",
                      backgroundColor: "currentColor",
                      transition: "width 0.6s ease",
                    },
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    textAlign: "left",
                    color: "#666",
                  }}
                >
                  {service.description}
                </Typography>
              </Box>
            </CustomRectangle>
          </Box>
        ))}
      </Box>

      {/* Lower background box */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "60%", sm: "47%" },
          left: { xs: "70%", sm: "55%" },
          width: "100%",
          mx: { xs: "5%", sm: "15%" },
          zIndex: 100,
        }}
      >
        <CircularText
          text="SERVICE"
          link="/service"
          size={isMobile ? 100 : 200} // Adjusted size for responsiveness
        />
      </Box>
      <CustomRectangle
        size={{
          width: { xs: "105%", sm: "100%" },
          height: { xs: "100px", sm: "150px" },
        }}
        zIndex={2}
        direction={false}
        color="#f2f2f2"
        sx={{
          position: "absolute",
          top: { xs: "75%", sm: "80%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
    </Box>
  );
};

export default ServiceSection;
