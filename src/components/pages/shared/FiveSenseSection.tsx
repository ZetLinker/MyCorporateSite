import React from "react";
import { Box, Typography } from "@mui/material";
import BackWave from "../../util/BackWave";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectをインポート

const FiveSenseSection: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        pt: { xs: 10, sm: 15 },
        mb: 15,
        height: "50vh", // セクション全体の高さを50vhに指定
        display: "flex",
        flexDirection: "column", // 縦方向に要素を並べる
        justifyContent: "center", // 中央寄せ
        alignItems: "center", // 横方向の中央寄せ
        position: "relative",
      }}
    >
      {/* 背景のBackWave */}
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
        <BackWave wave={[11, 12, 1, 4]} />
      </Box>

      {/* FIVE SENSE タイトル */}
      <CustomEffect>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            pt: 10,
            fontSize: {
              xs: "14px",
              sm: "14px",
              lg: "16px",
              xl: "16px",
            },
          }}
        >
          FIVE SENSE
        </Typography>
      </CustomEffect>

      {/* 行動規範 */}
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
          行動規範
        </Typography>
      </CustomEffect>

      {/* 各行動規範の説明 */}
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
            variant="body2"
            sx={{ mb: 4, fontSize: { xs: "14px", sm: "16px" } }} // モバイル14px, PC16px
          >
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "18px" }, // 太文字 & フォントサイズを2ポイント大きく
                mb: { xs: 1, sm: 0 }, // モバイルのみ下にマージンを追加
              }}
            >
              GET SMILE
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              ：
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              <br />
            </Box>
            顧客と共に成長し、ポジティブな体験を提供する
          </Typography>
        </CustomEffect>

        <CustomEffect>
          <Typography
            variant="body2"
            sx={{ mb: 4, fontSize: { xs: "14px", sm: "16px" } }} // モバイル14px, PC16px
          >
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "18px" }, // 太文字 & フォントサイズを2ポイント大きく
                mb: { xs: 1, sm: 0 }, // モバイルのみ下にマージンを追加
              }}
            >
              CREATE VALUE
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              ：
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              <br />
            </Box>
            自発的に思考し、価値を創造する
          </Typography>
        </CustomEffect>

        <CustomEffect>
          <Typography
            variant="body2"
            sx={{ mb: 4, fontSize: { xs: "14px", sm: "16px" } }} // モバイル14px, PC16px
          >
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "18px" }, // 太文字 & フォントサイズを2ポイント大きく
                mb: { xs: 1, sm: 0 }, // モバイルのみ下にマージンを追加
              }}
            >
              EMBRACE CHANGE
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              ：
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              <br />
            </Box>
            変化を恐れず、成長のチャンスとして捉える
          </Typography>
        </CustomEffect>

        <CustomEffect>
          <Typography
            variant="body2"
            sx={{ mb: 4, fontSize: { xs: "14px", sm: "16px" } }} // モバイル14px, PC16px
          >
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "18px" }, // 太文字 & フォントサイズを2ポイント大きく
                mb: { xs: 1, sm: 0 }, // モバイルのみ下にマージンを追加
              }}
            >
              CELEBRATE SUCCESS
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              ：
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              <br />
            </Box>
            小さな成功も大切にし、喜びを共有する
          </Typography>
        </CustomEffect>

        <CustomEffect>
          <Typography
            variant="body2"
            sx={{ mb: 4, fontSize: { xs: "14px", sm: "16px" } }} // モバイル14px, PC16px
          >
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "18px" }, // 太文字 & フォントサイズを2ポイント大きく
                mb: { xs: 1, sm: 0 }, // モバイルのみ下にマージンを追加
              }}
            >
              INSPIRE OTHERS
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              ：
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              <br />
            </Box>
            他者をやる気にさせ、共に成長する
          </Typography>
        </CustomEffect>
      </Box>
    </Box>
  );
};

export default FiveSenseSection;
