import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";

interface BusinessProfileSectionProps {
  displayCircularText?: boolean; // CircularTextの表示を制御するためのプロパティ
}

const BusinessProfileSection: React.FC<BusinessProfileSectionProps> = ({
  displayCircularText = true, // デフォルトでCircularTextを表示
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [hasAnimated]);

  return (
    <Box
      id="businessProfileSection"
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: { xs: "2100px", sm: "1800px" },
        height: "auto",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 上部の背景ボックス（薄い色） */}
      <CustomRectangle
        size={{
          width: { xs: "70%", sm: "60%" },
          height: { xs: "100px", sm: "150px" },
        }}
        zIndex={50}
        direction={false}
        sx={{
          position: "absolute",
          top: "2%",
          right: "-5%",
        }}
      >
        {/* 絶対位置のボックスで囲む */}
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
                sm: "clamp(24px, 2.5vw, 30px)",
              },
              mx: 2,
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
            }}
          >
            BUSINESS PROFILE
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
              },
              mx: "16px",
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
            }}
          >
            - 私たちについて
          </Typography>
        </Box>
      </CustomRectangle>
      <CustomRectangle
        color={true}
        size={{ width: "80%", height: "100px" }}
        zIndex={49}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "5%", sm: "8%" },
          left: "-5%",
        }}
      />

      {/* 中央のボックス */}
      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "370px", sm: "410px", md: "380px" },
        }}
        zIndex={42}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "6%", sm: "10%" },
          right: { xs: "5%", sm: "10%" },
        }}
      >
        {/* テキストを囲むBoxを追加 */}

        <Box
          sx={{
            position: "absolute",
            top: { xs: "27%", sm: "20%", md: "25%" },
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
            MESSAGE
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
            代表の挨拶
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)",
              },
              letterSpacing: {
                xs: "0.05em",
                sm: "0.05em",
              },
              mb: 2,
            }}
          >
            人と人が、未来を紡ぐ線になる。
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
              mb: 2,
            }}
          >
            私たちは、地域の皆さまと共に歩みながら、デジタル技術を通じて企業や個人、そして地域の成長をサポートしています。デジタルコンサルティングやウェブサイト・アプリ開発で、皆さまの想いを形にし、その魅力を広く届けるお手伝いをしています。日々の運用も安心して続けられるよう、プロモーションを含めた総合的なサポートを提供し、地域全体に豊かさと笑顔をもたらす未来を共に育んでいきます。これからもどうぞよろしくお願いいたします。
          </Typography>
        </Box>
      </CustomRectangle>
      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "340px", sm: "400px" },
        }}
        zIndex={38}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "27%", sm: "28%" },
          left: { xs: "5%", sm: "10%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "15%", sm: "20%" },
            width: "50%",
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
            PROFILE
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
            代表自己紹介
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
            和歌山出身、1996年生まれ。
            理学療法士として大阪でキャリアをスタートし、病院で幅広いの患者様の生活をより良くするために全力を尽くしてきました。その後、より広い視点から社会に貢献するため、システムエンジニアに転身。上京後は、飲食、医療、金融など多岐にわたる業界で、WEBサービスやDXプロジェクトに携わり、IT技術の力で社会を支えてきました。2024年10月、地域社会に貢献するため「ZetLinker」を立ちあげました。
          </Typography>
        </Box>
      </CustomRectangle>
      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "450px", sm: "500px" },
        }}
        zIndex={35}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "47%", sm: "48%" },
          right: { xs: "5%", sm: "10%" },
        }}
      >
        {/* テキストを囲むBoxを追加 */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "10%", sm: "15%" },
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
              mb: 2,
            }}
          >
            AWARD
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
              mb: 4,
            }}
          >
            2024 Japan AWS All Certifications Engineers
          </Typography>
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
            CERTIFICATION
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
              whiteSpace: "nowrap", // テキストの折り返しを防止
              overflow: "hidden", // はみ出した部分を隠す
              textOverflow: "ellipsis", // はみ出した部分を「…」にする
            }}
          >
            AWS Certified Cloud Practitioner (2021)
            <br /> AWS Certified Solutions Architect – Associate (2021)
            <br /> Oracle Certified Java Programmer, SE 11 Silver & Gold (2021)
            <br /> AWS Certified Developer – Associate (2022)
            <br /> AWS Certified DevOps Engineer – Professional (2022)
            <br /> LPIC-1 & LPIC-2: Linux Professional Institute Certification
            (2022-2023)
            <br /> AWS Certified Database – Specialty (2023)
            <br /> AWS Certified Security – Specialty (2023) <br />
            AWS Certified Data Analytics – Specialty (2023)
            <br /> AWS Certified Machine Learning – Specialty (2023)
            <br /> AWS Certified Advanced Networking – Specialty (2023)
            <br /> AWS Certified: SAP on AWS – Specialty (2023) <br />
            Professional Cloud Architect (2024)
          </Typography>
        </Box>
      </CustomRectangle>
      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "350px", sm: "450px" },
        }}
        zIndex={30}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "74%", sm: "72%" },
          left: { xs: "5%", sm: "10%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "10%", sm: "20%" },
            width: "50%",
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
            BUSINESS PROFILE
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
            ビジネス情報
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
            }}
          >
            事業名:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              color: "black",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            ZetLinker
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
            }}
          >
            代表者:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              color: "black",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            金原 隆利 (Kanehara Takato)
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
            }}
          >
            事業開始年月:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              color: "black",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            2024年08月
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
            }}
          >
            住所:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              color: "black",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            東京都 新宿区 西新宿3丁目3番13号 西新宿水間ビル2F
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
            }}
          >
            事業内容:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              color: "black",
              fontSize: {
                xs: "10px",
                sm: "clamp(10px, 1vw, 12px)",
              },
            }}
          >
            デジタルコンサルティング事業
            <br />
            ウェブサイト事業
            <br />
            デジタルサポート・メンテナンス事業
            <br />
            アプリ開発事業
            <br />
            プロモーション事業
          </Typography>
        </Box>
      </CustomRectangle>
      <CustomRectangle
        size={{ width: "100%", height: "300px" }}
        zIndex={2}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "57%", sm: "54%" },
          right: "-5%",
        }}
      />
      <CustomRectangle
        color={false}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "23%", sm: "35%" },
          right: { xs: "-5%", sm: "-5%" },
          zIndex: {
            xs: 39,
            sm: 30,
          },
        }}
      />
      <CustomRectangle
        color={true}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "43%", sm: "50%" },
          left: { xs: "-5%", sm: "-5%" },
          zIndex: {
            xs: 36,
            sm: 28,
          },
        }}
      />
      <CustomRectangle
        color={false}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        zIndex={15}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "90%", sm: "83%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
    </Box>
  );
};

export default BusinessProfileSection;
