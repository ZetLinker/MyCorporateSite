import React from "react";
import { Box, Typography } from "@mui/material";
import ImageSlider from "../util/ImageSlider";
import PhilosophyParts from "./shared/PhilosophyParts";
import MessageSection from "./shared/MessageSection";
import FadeInOnScroll from "../util/FadeInOnScroll";

// 画像のインポート
import flowcopy2 from "../../assets/flowcopy2.png";
import about_info from "../../assets/about_info.png"; // about_info 画像のインポート

const Company: React.FC = () => {
  return (
    <Box id="wrapper" sx={{ opacity: 1 }}>
      <FadeInOnScroll>
        <Box
          component="section"
          sx={{
            textAlign: "center",
            mt: 5,
            py: 5,
            borderRadius: "8px",
            "@media (max-width: 600px)": {
              mt: 4,
              py: 3,
            },
            position: "relative", // 位置調整のために追加
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "primary.main",
              fontSize: { xs: "20px", md: "inherit" }, // モバイルでは20px、デスクトップではデフォルトのサイズを使用
            }}
          >
            COMPANY
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "center",
              mx: 2,
              position: "absolute",
              left: { xs: "0%", md: "10%" },
              top: { xs: "auto", md: "auto" },
            }}
          >
            <Box
              component="img"
              src={about_info}
              alt="kanehara.web"
              sx={{
                width: { xs: "20px", md: "40px" },
                height: "auto",
              }}
            />
          </Box>
          {/* PHILOSOPHYセクション */}
          <PhilosophyParts />

          {/* COMPANY INFOセクション */}
          <Box className="compbox" sx={{ mb: { xs: 5, md: 10 } }}>
            {[
              { label: "事業", value: "kanehara.web" },
              { label: "代表者", value: "金原 隆利 (Kanehara Takato)" },
              { label: "事業開始年月", value: "2024年08月" },
              {
                label: "住所",
                value: "東京都 新宿区 西新宿3丁目3番13号\n西新宿水間ビル2F", // 改行を含む
              },
              {
                label: "事業内容",
                value:
                  "ITコンサティング\nウェブサイト制作・運用事業\nウェブアプリ開発・運用事業\nDX推進支援\n地域イベントプロモーション支援\nITスキルトレーニング事業",
              },
            ].map((item, index) => (
              <Box
                key={index}
                className="company_box"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                  mb: 3,
                  justifyContent: "space-between",
                  borderBottom: "1px solid",
                  borderColor: "primary.main", // 下線を追加
                  pt: 2,
                  pb: 2,
                  width: { xs: "90%", md: "60%" }, // モバイル用に幅を調整
                  margin: "0 auto", // 中央に配置
                  flexDirection: { xs: "column", md: "row" }, // モバイルで縦並び
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "30%" }, // モバイルで幅を100%に調整
                    textAlign: { xs: "center", md: "right" }, // モバイルで中央寄せ
                    pr: { xs: 0, md: 2 }, // モバイルでパディングを調整
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: { xs: "absolute", md: "absolute" }, // モバイルで絶対配置を無効化
                      top: "50%",
                      left: 0,
                      width: { xs: "5px", md: "5px" },
                      height: { xs: "30px", md: "100%" }, // モバイル用に高さを調整
                      backgroundColor: "primary.main",
                      transform: { xs: "none", md: "translateY(-50%)" }, // モバイルでトランスフォームを無効化
                      marginBottom: { xs: 1, md: 0 }, // モバイル用に下マージンを追加
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      display: "inline-block",
                      width: "100%",
                      pr: { xs: 0, md: 2 }, // モバイル用にパディング調整
                      color: "primary.main",
                      textAlign: "center", // モバイル用に中央寄せ
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    display: "inline-block",
                    textAlign: { xs: "center", md: "left" }, // モバイルで中央寄せ
                    width: { xs: "100%", md: "65%" }, // モバイルで幅を100%に調整
                    marginTop: { xs: 1, md: 0 }, // モバイル用に上マージンを追加
                    fontSize: { xs: "14px", md: "inherit" }, // モバイルのみフォントサイズを14pxに変更
                  }}
                >
                  {item.value.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </FadeInOnScroll>
      {/* MESSAGEセクション */}
      <FadeInOnScroll>
        <MessageSection />
      </FadeInOnScroll>
      {/* PROFILEセクション */}
      <FadeInOnScroll>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingX: { xs: 2, md: 0 }, // モバイル用にパディングを追加
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "60%" }, // モバイル用に幅を100%に調整
              textAlign: "left",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
                color: "primary.main",
                mb: 2,
                fontSize: { xs: "20px", md: "inherit" }, // モバイル用のフォントサイズ調整
              }}
            >
              PROFILE.
            </Typography>
            <Box className="prinfo" sx={{ mb: 5 }}>
              <Box className="protxt" sx={{ mb: 5 }}>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: { xs: "14px", md: "inherit" }, // モバイル用のフォントサイズ調整
                  }}
                >
                  和歌山出身、1996年生まれ。
                  <br />
                  私は理学療法士として大阪でキャリアをスタートし、様々な患者様の生活を少しでもより良くするために尽力しました。その後、より広範な影響を与えるためにシステムエンジニアへと転身。上京後、飲食、医療、金融系のWEBサービスやDXプロジェクトに携わり、IT技術の力で社会を支えることに取り組んできました。そして、地域社会に貢献するため、2024年8月に「kanehara.web」をスタート。今後は「情報技術でより良い時間を」創造することを目指し、地域のデジタル技術を更新し、人々が豊かで幸福な生活を送れる環境を作り出すことに尽力していきます。
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </FadeInOnScroll>
      {/* CERTIFICATIONSセクション */}
      <FadeInOnScroll>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingX: { xs: 2, md: 0 }, // モバイル用にパディングを追加
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "60%" }, // モバイル用に幅を100%に調整
              textAlign: "left",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
                color: "primary.main",
                mb: 2,
                fontSize: { xs: "20px", md: "inherit" }, // モバイル用のフォントサイズ調整
              }}
            >
              CERTIFICATIONS.
            </Typography>
            <Box className="prinfo" sx={{ mb: 5 }}>
              <Box className="protxt">
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "14px", md: "inherit" }, // モバイル用のフォントサイズ調整
                  }}
                >
                  AWS Certified Cloud Practitioner (2021)
                  <br />
                  AWS Certified Solutions Architect – Associate (2021)
                  <br />
                  Oracle Certified Java Programmer, SE 11 Silver & Gold (2021)
                  <br />
                  AWS Certified Developer – Associate (2022)
                  <br />
                  AWS Certified DevOps Engineer – Professional (2022)
                  <br />
                  LPIC-1 & LPIC-2: Linux Professional Institute Certification
                  (2022-2023)
                  <br />
                  AWS Certified Database – Specialty (2023)
                  <br />
                  AWS Certified Security – Specialty (2023)
                  <br />
                  AWS Certified Data Analytics – Specialty (2023)
                  <br />
                  AWS Certified Machine Learning – Specialty (2023)
                  <br />
                  AWS Certified Advanced Networking – Specialty (2023)
                  <br />
                  AWS Certified: SAP on AWS – Specialty (2023)
                  <br />
                  Professional Cloud Architect (2024)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </FadeInOnScroll>
      {/* スライドセクション */}
      <ImageSlider images={[flowcopy2]} backgroundColor="primary.main" />
    </Box>
  );
};

export default Company;
