import React, { useRef } from "react";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import CircularText from "../../util/CircularText";

const WebsiteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Service items data based on extracted text
  const services = [
    {
      number: "01.",
      title: "コーポレートサイト制作",
      description:
        "企業のブランド力を強化し、信頼性を高めるためのサイトです。会社情報、事業内容、実績、問い合わせ情報などを掲載し、関係取引先に対して企業の価値を伝えることを目的としています。",
    },
    {
      number: "02.",
      title: "サービスサイト制作",
      description:
        "特定のサービスや製品に焦点を当て、その詳細や魅力をわかりやすく紹介するサイトです。機能説明や導入事例、価格情報などを掲載し、ターゲットユーザーに向けた情報を提供します。",
    },
    {
      number: "03.",
      title: "採用サイト制作",
      description:
        "求職者に向けた企業の採用専用サイトです。会社のビジョンや社員、業務風景のインタビューなどを通じて、応募者に対して企業の魅力を伝え、応募促進を図ります。",
    },
    {
      number: "04.",
      title: "LP制作",
      description:
        "特定のサービスや製品を宣伝し、ユーザーに強く訴求するLP（ランディングページ）です。問い合わせを促すためのフォームを設置し、コンバージョンに特化しています。",
    },
    {
      number: "05.",
      title: "周年・キャンペーンサイト",
      description:
        "企業の記念イベントやキャンペーンを特集するサイトです。特設ページとして、顧客とのコミュニケーションを強化し、プロモーションの場として活用されます。",
    },
    {
      number: "06.",
      title: "ポータルサイト",
      description:
        "複数のコンテンツやサービスを集約し、ユーザーが効率的に情報を取得できるサイトです。ニュース、フォーラム、イベントなどを組み合わせたプラットフォームとして活用されます。",
    },
  ];

  return (
    <>
      <Box
        id="website-section"
        ref={sectionRef}
        sx={{
          position: "relative",
          minHeight: { xs: "2700px", sm: "1800px", md: "1450px" },
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
                  xs: "16px",
                  sm: "clamp(24px, 2.5vw, 30px)",
                  md: "clamp(24px, 2.5vw, 30px)",
                },
                mx: 2,
              }}
            >
              ウェブサイト制作
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#e64525",
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
              - Create WebSite
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          color={true}
          size={{ width: "80%", height: "80px" }}
          zIndex={49}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "7%", sm: "10%", md: "13%" },
            left: "-5%",
          }}
        />

        {/* 中央のボックス */}
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
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "8%", sm: "12%", md: "15%" },
            left: {
              xs: "15%",
              sm: "35%",
              md: "50%",
            },
          }}
        >
          {/* テキストを囲むBoxを追加 */}
          <Box
            sx={{
              position: "absolute",
              top: "35%",
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
              お客様のブランドイメージやビジョンを反映したプロフェッショナルなウェブサイトを、一貫したサポートで制作から公開までお手伝いします。魅力的で効果的なウェブサイトを通じて、ブランドの成長と集客力の向上を支援します。
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          size={{
            width: { xs: "80%", sm: "70%", md: "70%" },
            height: { xs: "80px", sm: "100px", md: "100px" },
          }}
          zIndex={45}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "20%", sm: "30%", md: "35%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "30%",
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

        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "70%", md: "70%" },
            height: { xs: "100px", sm: "100px", md: "100px" },
          }}
          zIndex={44}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "14%", sm: "20%", md: "25%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />

        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "100%", md: "100%" },
            height: { xs: "100px", sm: "100px", md: "100px" },
          }}
          zIndex={44}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "29%", sm: "45%", md: "52%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />

        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "70%", md: "70%" },
            height: { xs: "100px", sm: "100px", md: "100px" },
          }}
          zIndex={44}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "41%", sm: "65%", md: "80%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />
        <CustomRectangle
          size={{
            width: { xs: "90%", sm: "100%", md: "100%" },
            height: { xs: "100px", sm: "100px", md: "100px" },
          }}
          zIndex={44}
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "54%", sm: "85%", md: "52%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
            display: { xs: "block", sm: "block", md: "none" }, // smのみ表示
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
            top: { xs: "67%", sm: "73%" },
            left: { xs: "-5%", sm: "-5%" },
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
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "79%", sm: "82%" },
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
            top: { xs: "92%", sm: "73%" },
            left: { xs: "-5%", sm: "-5%" },
            display: { xs: "block", sm: "none", md: "none" }, // smのみ表示
            zIndex: {
              xs: 36,
              sm: 28,
            },
          }}
        />
        <Grid
          container
          spacing={3}
          sx={{
            position: "absolute",
            top: { xs: "24%", sm: "35%", md: "42%" },
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "90%", sm: "80%", md: "80%" },
            mt: { xs: 0, sm: 5, md: 5 },
            justifyContent: "center",
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
                  direction={true}
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
                      ml: 1.5,
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
                  direction={true}
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
                      left: "10%",
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
                        fontSize: { xs: "12px", sm: "14px", md: "14px" },
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
      </Box>

      {/* FAQ Section */}
      <Box
        id="website-section"
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
            width: { xs: "70%", sm: "70%", md: "70%" },
            height: { xs: "80px", sm: "100px", md: "100px" },
          }}
          zIndex={38}
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
              left: "30%",
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
            width: { xs: "100%", sm: "100%", md: "100%" }, // xsのWidthを既存の設定に合わせました
            height: { xs: "120px", sm: "100px", md: "100px" },
          }}
          zIndex={49}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "20%", sm: "23%", md: "23%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", sm: "15%", md: "20%" },
              left: { xs: "15%", sm: "30%", md: "30%" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mr: { xs: 2, sm: 2, md: 2 },
                mb: { xs: 0, sm: 0, md: 0 },
                minWidth: { xs: "250px", sm: "250px", md: "250px" }, // 同様にminWidthも整えました
                color: "#333",
                textAlign: { xs: "left", sm: "left", md: "left" },
                fontSize: {
                  xs: "14px",
                  sm: "clamp(16px, 1vw, 18px)",
                  md: "clamp(16px, 1vw, 18px)",
                },
              }}
            >
              サイトの制作期間はどのくらいかかりますか？
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: { xs: "left", sm: "left", md: "left" },
                maxWidth: { xs: "90%", sm: "800px", md: "800px" },
                fontSize: {
                  xs: "12px",
                  sm: "clamp(14px, 1vw, 16px)",
                  md: "clamp(14px, 1vw, 16px)",
                },
              }}
            >
              通常の制作期間は、要件によって異なりますが、最短で4週間程度で対応可能です。
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
          direction={false}
          sx={{
            position: "absolute",
            top: { xs: "40%", sm: "40%", md: "40%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", sm: "15%", md: "20%" },
              left: { xs: "10%", sm: "20%", md: "20%" },
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
              サイトにSEO対策は含まれていますか？
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: { xs: "left", sm: "left", md: "left" },
                maxWidth: { xs: "90%", sm: "800px", md: "800px" },
                fontSize: {
                  xs: "12px",
                  sm: "clamp(14px, 1vw, 16px)",
                  md: "clamp(14px, 1vw, 16px)",
                },
              }}
            >
              基本的なSEO対策は含まれていますが、さらに高度な対策もオプションで提供可能です。
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
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "60%", sm: "57%", md: "57%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", sm: "15%", md: "20%" },
              left: { xs: "15%", sm: "30%", md: "30%" },
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
              サービスサイトに動画を追加できますか？
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: { xs: "left", sm: "left", md: "left" },
                maxWidth: { xs: "90%", sm: "800px", md: "800px" },
                fontSize: {
                  xs: "12px",
                  sm: "clamp(14px, 1vw, 16px)",
                  md: "clamp(14px, 1vw, 16px)",
                },
              }}
            >
              もちろん可能です。動画やアニメーションでサービスの魅力をより効果的に伝えることができます。
            </Typography>
          </Box>
        </CustomRectangle>

        <CustomRectangle
          size={{
            width: { xs: "70%", sm: "60%", md: "60%" },
            height: { xs: "150px", sm: "300px", md: "300px" },
          }}
          zIndex={28}
          direction={true}
          sx={{
            position: "absolute",
            top: { xs: "65%", sm: "35%", md: "35%" },
            left: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />

        <CustomRectangle
          size={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: { xs: "150px", sm: "150px", md: "150px" },
          }}
          zIndex={2}
          direction={false}
          color="#f2f2f2"
          sx={{
            position: "absolute",
            top: { xs: "70%", sm: "70%", md: "70%" },
            right: { xs: "-5%", sm: "-5%", md: "-5%" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "80%", sm: "70%" },
            left: { xs: "60%", sm: "60%" },
            width: "100%",
            mx: { xs: "5%", sm: "15%" },
            zIndex: 100,
          }}
        >
          <CircularText
            text="CONTACT US " // 表示するテキスト
            link="/contact" // クリック時の遷移先パス
            size={isMobile ? 96 : 192}
          />
        </Box>
      </Box>
    </>
  );
};

export default WebsiteSection;
