import React from "react";
import { Box, Typography } from "@mui/material";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const ValueSection: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        pt: { xs: 10, sm: 15 },
        mb: 5,
        height: "50vh", // セクション全体の高さを50vhに指定
        display: "flex",
        flexDirection: "column", // 縦方向に要素を並べる
        justifyContent: "center", // 中央寄せ
        alignItems: "center", // 横方向の中央寄せ
      }}
    >
      {/* VALUE タイトル */}
      <CustomEffect>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            pt: 10,
            fontSize: {
              xs: "14px",
              sm: "16px",
              lg: "16px",
              xl: "16px",
            },
          }}
        >
          VALUE
        </Typography>
      </CustomEffect>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 中心に寄せる
          width: "100%",
          height: "100%",
          zIndex: -10,
          mt: { xs: 20, sm: 10 },
        }}
      >
        <BackWave wave={[11, 5, 8]} />
      </Box>

      {/* 提供する価値 */}
      <CustomEffect>
        <Typography
          variant="body2" // 文言を小さく設定
          sx={{
            mb: 10,
            fontSize: {
              xs: "10px",
              sm: "12px", // 小さめのフォントサイズ
            },
          }}
        >
          提供する価値
        </Typography>
      </CustomEffect>

      {/* 各価値の説明 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // 縦方向に配置
          justifyContent: "center", // 垂直方向中央寄せ
          alignItems: "center", // 横方向中央寄せ
          height: "100%", // 高さを全体に設定
          maxWidth: "80%",
        }}
      >
        <CustomEffect>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "16px", sm: "18px" }, // モバイル16px, PC18px
            }}
          >
            地域との共創
          </Typography>
        </CustomEffect>
        <CustomEffect>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xs: "14px", sm: "16px" }, // モバイル14px, PC16px
            }}
          >
            地域社会と共に、価値を築いていきます。
          </Typography>
        </CustomEffect>

        <CustomEffect>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "16px", sm: "18px" }, // モバイル16px, PC18px
            }}
          >
            持続可能な成長サポート
          </Typography>
        </CustomEffect>
        <CustomEffect>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xs: "14px", sm: "16px" }, // モバイル14px, PC16px
            }}
          >
            お客様の成長を支え、持続可能なビジネスと社会の発展に寄り添います。
          </Typography>
        </CustomEffect>

        <CustomEffect>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "16px", sm: "18px" }, // モバイル16px, PC18px
            }}
          >
            顧客のビジョンを実現
          </Typography>
        </CustomEffect>
        <CustomEffect>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xs: "14px", sm: "16px" }, // モバイル14px, PC16px
            }}
          >
            お客様のビジョンを最適なIT戦略で共に形にします。
          </Typography>
        </CustomEffect>
      </Box>
    </Box>
  );
};

export default ValueSection;
