import React, { useRef } from "react";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import CircularText from "../../util/CircularText";

const ITConsultingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Service items data for IT Consulting
  const services = [
    {
      number: "01.",
      title: "ITソリューション",
      description:
        "お客様が抱える悩みや課題に対して、ITサービスの最適な提案を行い、業務プロセスやシステムを分析し、企業の成長や効率向上を支援します。",
    },
    {
      number: "02.",
      title: "システム導入",
      description:
        "現在のシステムをより効果的に活用するための支援や、新しいシステムの導入と統合を行い、ビジネスプロセスを最適化します。",
    },
    {
      number: "03.",
      title: "DX支援",
      description:
        "デジタルトランスフォーメーション（DX）の実現を支援し、デジタル技術を駆使した革新的なビジネスプロセスの変革をサポートします。",
    },
  ];

  return (
    <>
      <Box
        id="it-consulting-section"
        ref={sectionRef}
        sx={{
          position: "relative",
          minHeight: { xs: "1600px", sm: "1450px", md: "1050px" },
          height: "auto",
          width: "100vw",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "40px 20px", sm: "80px 40px", md: "80px 40px" },
        }}
      >
        {/* Title Section */}
        <CustomRectangle
          size={{
            width: { xs: "80%", sm: "50%", md: "50%" },
            height: { xs: "100px", sm: "150px", md: "150px" },
          }}
          zIndex={50}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "5%", sm: "5%", md: "5%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              right: "5%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "black",
                textAlign: "left",
                fontSize: {
                  xs: "16px",
                  sm: "clamp(24px, 2.5vw, 30px)",
                  md: "clamp(24px, 2.5vw, 30px)",
                },
                mx: 2,
              }}
            >
              デジタルコンサル
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#67aac7",
                fontWeight: "bold",
                textAlign: "left",
                fontSize: {
                  xs: "10px",
                  sm: "clamp(12px, 2vw, 14px)",
                  md: "clamp(12px, 2vw, 14px)",
                },
                mx: "16px",
                letterSpacing: {
                  xs: "0.05em",
                  sm: "0.05em",
                  md: "0.05em",
                },
              }}
            >
              - Digital Consulting
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          color={false}
          size={{ width: "80%", height: "80px" }}
          zIndex={49}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "9%", sm: "13%", md: "15%" },
            right: "-5%",
          }}
        />

        {/* Center Box */}
        <CustomRectangle
          color="white"
          size={{
            width: {
              xs: "90%",
              sm: "65%",
              md: "35%",
            },
            height: "250px",
          }}
          zIndex={48}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "10%", sm: "14%", md: "20%" },
            left: { xs: "15%", sm: "15%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "40%", sm: "40%", md: "35%" },
              width: "70%",
              mx: "15%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "left",
                color: "black",
                lineHeight: 1.6,
                fontSize: {
                  xs: "12px",
                  sm: "clamp(12px, 1vw, 14px)",
                  md: "clamp(12px, 1vw, 14px)",
                },
              }}
            >
              お客様が抱える悩みや課題に対して、ITサービスの最適な提案を行い、現状の業務プロセスやシステムを分析し、企業の成長や効率向上を実現するための最適なソリューションを提供します。
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          size={{
            width: { xs: "80%", sm: "70%", md: "70%" },
            height: { xs: "100px", sm: "100px", md: "100px" },
          }}
          zIndex={44}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "15%", sm: "22%", md: "28%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />

        <CustomRectangle
          size={{
            width: { xs: "70%", sm: "60%", md: "60%" },
            height: { xs: "80px", sm: "100px", md: "100px" },
          }}
          zIndex={45}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "28%", sm: "35%", md: "45%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "20%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "black",
                textAlign: "left",
                fontSize: {
                  xs: "14px",
                  sm: "clamp(18px, 2.5vw, 20px)",
                  md: "clamp(18px, 2.5vw, 20px)",
                },
                mx: 2,
              }}
            >
              Menu
            </Typography>
          </Box>
        </CustomRectangle>

        <Grid
          container
          spacing={3}
          sx={{
            position: "absolute",
            top: { xs: "35%", sm: "45%", md: "57%" },
            right: "50%",
            transform: "translateX(50%)",
            width: { xs: "90%", sm: "80%", md: "80%" },
            mt: { xs: 0, sm: 5, md: 5 },
            justifyContent: "left",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <CustomRectangle
                  color="white"
                  size={{
                    width: { xs: "60px", sm: "70px", md: "70px" },
                    height: { xs: "60px", sm: "70px", md: "70px" },
                  }}
                  zIndex={50}
                  direction={false}
                  sx={{
                    position: "absolute",
                    top: "-25px", // 固定位置
                    left: {
                      xs: "calc(15% - 20px)", // xsサイズでの調整
                      sm: "calc(15% - 50px)", // smサイズでの調整
                      md: "calc(15% - 50px)", // mdサイズでの調整
                      lg: "calc(20% - 50px)", // lgサイズでの調整
                      xl: "calc(20% - 30px)", // xlサイズでの調整
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "10px", sm: "12px", md: "12px" },
                      color: "black",
                      mb: 4,
                      mr: 1.5,
                    }}
                  >
                    {service.number}
                  </Typography>
                </CustomRectangle>

                <CustomRectangle
                  color="white"
                  size={{
                    width: { xs: "70%", sm: "70%", md: "70%" },
                    height: { xs: "280px", sm: "300px", md: "300px" },
                  }}
                  zIndex={49}
                  direction={false}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: { xs: "20px", sm: "25px", md: "25px" },
                    position: "relative",
                    border: "1px solid #ddd",
                    mb: 5,
                    minWidth: "240px",
                    maxWidth: { xs: "90%", sm: "270px", md: "270px" },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "20%",
                      right: "10%",
                      width: "80%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      className="title"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {
                          xs: "14px",
                          sm: "clamp(16px, 1vw, 18px)",
                          md: "clamp(16px, 1vw, 18px)",
                        },
                        textAlign: "left",
                        mb: 4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "10px", sm: "12px", md: "12px" },
                        textAlign: "left",
                        color: "#666",
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                </CustomRectangle>
              </Box>
            </Grid>
          ))}
        </Grid>
        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "80%" },
            height: { xs: "100px", sm: "100px" },
          }}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "43%", sm: "73%" },
            left: { xs: "-5%", sm: "-5%" },
            zIndex: {
              xs: 36,
              sm: 28,
            },
          }}
        />
        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "80%" },
            height: { xs: "100px", sm: "100px" },
          }}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "63%", sm: "82%" },
            right: { xs: "-5%", sm: "-5%" },
            display: { xs: "block", sm: "none", md: "none" }, // smのみ表示
            zIndex: {
              xs: 36,
              sm: 28,
            },
          }}
        />
        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "80%" },
            height: { xs: "100px", sm: "100px" },
          }}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "85%", sm: "73%" },
            left: { xs: "-5%", sm: "-5%" },
            display: { xs: "block", sm: "none", md: "none" }, // smのみ表示
            zIndex: {
              xs: 36,
              sm: 28,
            },
          }}
        />
      </Box>

      {/* FAQ Section */}
      <Box
        id="faq-section"
        ref={sectionRef}
        sx={{
          position: "relative",
          minHeight: { xs: "700px", sm: "800px", md: "750px" },
          height: "auto",
          width: "100vw",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "20px", sm: "80px 40px", md: "80px 40px" },
        }}
      >
        <CustomRectangle
          size={{
            width: { xs: "70%", sm: "60%", md: "60%" },
            height: { xs: "80px", sm: "100px", md: "100px" },
          }}
          zIndex={38}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "5%", sm: "5%", md: "5%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "20%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "black",
                textAlign: "left",
                fontSize: {
                  xs: "14px",
                  sm: "clamp(18px, 2.5vw, 20px)",
                  md: "clamp(18px, 2.5vw, 20px)",
                },
                mx: 2,
              }}
            >
              よくある質問
            </Typography>
          </Box>
        </CustomRectangle>

        {/* FAQ Item 1 */}
        <CustomRectangle
          color="white"
          size={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: { xs: "120px", sm: "100px", md: "100px" },
          }}
          zIndex={49}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "20%", sm: "23%", md: "23%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", sm: "15%", md: "20%" },
              left: { xs: "15%", sm: "20%", md: "30%" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mr: { xs: 2, sm: 2, md: 2 },
                mb: { xs: 0, sm: 0, md: 0 },
                minWidth: { xs: "250px", sm: "250px", md: "250px" },
                color: "#333",
                textAlign: { xs: "left", sm: "left", md: "left" },
                fontSize: {
                  xs: "14px",
                  sm: "clamp(16px, 1vw, 18px)",
                  md: "clamp(16px, 1vw, 18px)",
                },
              }}
            >
              費用はどのくらいかかりますか？
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: { xs: "left", sm: "left", md: "left" },
                maxWidth: { xs: "80%", sm: "80%", md: "100%" },
                fontSize: {
                  xs: "12px",
                  sm: "clamp(14px, 1vw, 16px)",
                  md: "clamp(14px, 1vw, 16px)",
                },
              }}
            >
              内容により異なりますが、初回相談は無料で行い、具体的な要件に基づいて見積もりします。
            </Typography>
          </Box>
        </CustomRectangle>

        {/* FAQ Item 2 */}
        <CustomRectangle
          color="white"
          size={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: { xs: "120px", sm: "100px", md: "100px" },
          }}
          zIndex={49}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "40%", sm: "40%", md: "40%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", sm: "15%", md: "20%" },
              left: { xs: "25%", sm: "30%", md: "40%" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mr: { xs: 2, sm: 2, md: 2 },
                mb: { xs: 0, sm: 0, md: 0 },
                minWidth: { xs: "250px", sm: "250px", md: "250px" },
                color: "#333",
                textAlign: { xs: "left", sm: "left", md: "left" },
                fontSize: {
                  xs: "14px",
                  sm: "clamp(16px, 1vw, 18px)",
                  md: "clamp(16px, 1vw, 18px)",
                },
              }}
            >
              提案はカスタマイズできますか？
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: { xs: "left", sm: "left", md: "left" },
                maxWidth: { xs: "90%", sm: "90%", md: "800px" },
                fontSize: {
                  xs: "12px",
                  sm: "clamp(14px, 1vw, 16px)",
                  md: "clamp(14px, 1vw, 16px)",
                },
              }}
            >
              業務プロセスやニーズに合わせて、提案するツールやシステムを柔軟にカスタマイズいたします。
            </Typography>
          </Box>
        </CustomRectangle>

        {/* FAQ Item 3 */}
        <CustomRectangle
          color="white"
          size={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: { xs: "120px", sm: "100px", md: "100px" },
          }}
          zIndex={49}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "60%", sm: "57%", md: "57%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", sm: "15%", md: "20%" },
              left: { xs: "15%", sm: "20%", md: "30%" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mr: { xs: 2, sm: 2, md: 2 },
                mb: { xs: 0, sm: 0, md: 0 },
                minWidth: { xs: "250px", sm: "250px", md: "250px" },
                color: "#333",
                textAlign: { xs: "left", sm: "left", md: "left" },
                fontSize: {
                  xs: "14px",
                  sm: "clamp(16px, 1vw, 18px)",
                  md: "clamp(16px, 1vw, 18px)",
                },
              }}
            >
              ツールのトレーニングは提供されますか？
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: { xs: "left", sm: "left", md: "left" },
                maxWidth: { xs: "80%", sm: "80%", md: "100%" },
                fontSize: {
                  xs: "12px",
                  sm: "clamp(14px, 1vw, 16px)",
                  md: "clamp(14px, 1vw, 16px)",
                },
              }}
            >
              導入したツールをスムーズに利用できるよう、トレーニングやマニュアルの提供を行います。
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          size={{
            width: { xs: "70%", sm: "60%", md: "60%" },
            height: { xs: "150px", sm: "300px", md: "300px" },
          }}
          zIndex={28}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "65%", sm: "35%", md: "35%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />

        <CustomRectangle
          size={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: { xs: "150px", sm: "150px", md: "150px" },
          }}
          zIndex={2}
          direction={true}
          color="#f2f2f2"
          sx={{
            position: "absolute",
            top: { xs: "70%", sm: "70%", md: "70%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "80%", sm: "70%" },
            right: { xs: "60%", sm: "60%" },
            width: "100%",
            mx: { xs: "5%", sm: "15%" },
            zIndex: 100,
          }}
        >
          <CircularText
            text="CONTACT US."
            link="/contact"
            size={isMobile ? 96 : 192}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "80%", sm: "70%" },
            left: { xs: "0%", sm: "0%" },
            width: "100%",
            mx: { xs: "5%", sm: "15%" },
            zIndex: 100,
          }}
        >
          <CircularText
            text="CONTACT US."
            link="/contact"
            size={isMobile ? 96 : 192}
          />
        </Box>
      </Box>
    </>
  );
};

export default ITConsultingSection;
