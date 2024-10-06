import React from "react";
import { Box } from "@mui/material";
import ValueBox from "../../util/ValueBox"; // ValueBoxコンポーネントのパスを適切に設定してください

const MethodParts: React.FC = () => {
  const methodItems = [
    {
      number: "01",
      title: "デジタルプレゼンスの最適化",
      description:
        "レガシーなウェブサイトを最新技術でリプレイスし、UX向上とブランド価値を強化する",
    },
    {
      number: "02",
      title: "アプリケーションの開発",
      description: "カスタムアプリを開発し、利便性の高いアクセスを提供する",
    },
    {
      number: "03",
      title: "DX",
      description:
        "ビジネスプロセスをデジタル化し、自動化による効率化を推進する",
    },
    {
      number: "04",
      title: "円滑なコミュニケーション",
      description:
        "チャット、ビデオ会議、アプリケーションを統合し、円滑なコミュニケーションを実現する",
    },
    {
      number: "05",
      title: "デジタルマーケティングの強化",
      description:
        "SEOとコンテンツマーケティングで、オンラインプレゼンスとカスタマーとのつながりを強化する",
    },
    {
      number: "06",
      title: "ITコンサルティングとサポート",
      description:
        "ITインフラの見直しとデジタルソリューションの導入支援で、ビジネス効率を向上する",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        textAlign: "center",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 0", // 上下のパディングを調整
      }}
    >
      <Box
        className="valuebox"
        sx={{
          display: "flex",
          justifyContent: "center", // 要素を中央に配置
          alignItems: "flex-start", // 上揃えにするために追加
          flexWrap: "wrap", // フレックスボックスの要素を折り返し
          width: "100%", // 全体幅を100%に設定
          maxWidth: "1200px", // 最大幅を設定
          gap: "16px", // ボックス間の間隔を設定
          mb: 5,
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center", // モバイルで中央揃え
          },
        }}
      >
        {methodItems.map((item, index) => (
          <ValueBox
            key={index} // ユニークなキーを追加
            number={item.number}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MethodParts;
