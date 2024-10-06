import React, { useRef } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import ServiceFlow from "./ServiceFlow";

const ServiceProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Service steps data
  const steps = [
    {
      number: "01.",
      title: "ヒアリング",
      description:
        "まずはお客様の悩みやニーズを詳しくお伺いし、現状の課題や目標を把握します。丁寧なヒアリングを通じて、お客様のビジョンを共有し、最適な解決策を見つけるための第一歩を踏み出します。",
    },
    {
      number: "02.",
      title: "ご提案",
      description:
        "ヒアリング内容を基に、最適なITソリューションをご提案します。お客様のビジネスに合ったプランやサービスを提供し、将来の成長を見据えた戦略を描きます。",
    },
    {
      number: "03.",
      title: "ご契約",
      description:
        "ご提案内容にご納得いただけた場合、契約書を作成し、正式にサービス提供の準備を進めます。契約内容はお客様にとって分かりやすく、透明性を重視しています。",
    },
    {
      number: "04.",
      title: "サービス提供",
      description:
        "ご契約後、速やかにサービスを提供いたします。計画通りに進捗を管理し、お客様の期待に応えるサービスを提供いたします。※開発やカスタマイズが必要な場合は開発期間を要します。",
    },
  ];

  return (
    <>
      <Box
        id="service-process-section"
        ref={sectionRef}
        sx={{
          position: "relative",
          minHeight: { xs: "2250px", sm: "1750px", md: "1750px" },
          height: "auto",
          width: "100vw",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "40px 20px", sm: "80px 40px", md: "80px 40px" },
          mb: 10,
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
            top: { xs: "8%", sm: "7%", md: "7%" },
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
              サービス提供までの流れ
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
              - Service Flow
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
            top: { xs: "10%", sm: "13%", md: "15%" },
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
              md: "45%",
            },
            height: "300px",
          }}
          zIndex={48}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "11%", sm: "14%", md: "15%" },
            left: { xs: "15%", sm: "15%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "35%", sm: "40%", md: "35%" },
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
              契約までの流れは以下の通りです。まず、最初にお客様のご要望や課題を詳しくお伺いするヒアリングを行います。次に、ヒアリング内容に基づき、最適な解決策をご提案させていただきます。ご納得いただけましたら、ご契約に進みます。最後に、契約内容に従い、丁寧で迅速なサービス提供を開始し、お客様のビジネスやプロジェクトを成功へ導きます。
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          size={{
            width: { xs: "100%", sm: "95%", md: "80%" },
            height: { xs: "100px", sm: "250px", md: "250px" },
          }}
          zIndex={44}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "26%", sm: "35%", md: "35%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          {/* ServiceFlowコンポーネントを配置 */}
          <ServiceFlow />
        </CustomRectangle>

        <CustomRectangle
          size={{
            width: { xs: "70%", sm: "60%", md: "60%" },
            height: { xs: "80px", sm: "100px", md: "100px" },
          }}
          zIndex={45}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "31%", sm: "51%", md: "51%" },
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
              各ステップの詳細説明
            </Typography>
          </Box>
        </CustomRectangle>

        <Grid
          container
          spacing={3}
          sx={{
            position: "absolute",
            top: { xs: "35%", sm: "57%", md: "57%" },
            right: "50%",
            transform: "translateX(50%)",
            width: { xs: "90%", sm: "80%", md: "80%" },
            mt: { xs: 0, sm: 5, md: 5 },
            justifyContent: "left",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          {steps.map((step, index) => (
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
                      fontSize: { xs: "12px", sm: "14px", md: "14px" },
                      color: "black",
                      mb: 4,
                      mr: 1.5,
                    }}
                  >
                    {step.number}
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
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "12px", sm: "14px", md: "14px" },
                        textAlign: "left",
                        color: "#666",
                      }}
                    >
                      {step.description}
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
            top: { xs: "40%", sm: "68%" },
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
            top: { xs: "55%", sm: "88%" },
            right: { xs: "-5%", sm: "-5%" },
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
            top: { xs: "71%", sm: "73%" },
            left: { xs: "-5%", sm: "-5%" },
            display: { xs: "block", sm: "none", md: "none" }, // smのみ表示p
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
            top: { xs: "87%", sm: "73%" },
            right: { xs: "-5%", sm: "-5%" },
            display: { xs: "block", sm: "none", md: "none" }, // smのみ表示
            zIndex: {
              xs: 36,
              sm: 28,
            },
          }}
        />
      </Box>
    </>
  );
};

export default ServiceProcessSection;
