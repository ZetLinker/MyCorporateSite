import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import BackgroundDecoration from "../../util/BackgroundDecoration";
import CustomEffect from "../../util/CustomEffect"; // CustomEffectのインポート

interface ServiceItemProps {
  title: string;
  description: string;
  isTitleLeft: boolean; // trueならタイトルが左、falseなら右
  moreLink?: string; // moreボタンのリンク先
  onClick?: () => void; // クリック時の動作
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  description,
  isTitleLeft,
  moreLink,
  onClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column", // モバイルでは縦方向に並べる
          sm: isTitleLeft ? "row" : "row-reverse", // PCではisTitleLeftに基づいて反転
        },
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "80%", sm: "100%" },
        mb: 15,
        mt: 5,
        position: "relative", // 相対配置
      }}
    >
      {/* サービス名 */}
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          zIndex: 1,
          fontSize: { xs: "20px", sm: "24px" },
          textAlign: "center",
          mb: { xs: 2, sm: 0 },
          width: { xs: "100%", sm: "30%" },
          pl: isTitleLeft ? { xs: 0, sm: 0 } : { xs: 0, sm: 4 },
          pr: isTitleLeft ? { xs: 0, sm: 4 } : { xs: 0, sm: 0 },
        }}
      >
        {/* 背景装飾のコンポーネントを呼び出す */}
        <BackgroundDecoration />

        {/* サービス名のテキストとディスクリプションを同じコンテナに配置 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // モバイルで中央寄せ
            textAlign: "center",
            mt: 1,
          }}
        >
          {/* タイトル */}
          <CustomEffect>
            <Typography
              variant="h6"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: {
                  xs: "18px",
                  sm: "18px",
                  lg: "20px",
                  xl: "20px",
                },
              }}
            >
              {title}
            </Typography>
          </CustomEffect>

          {/* サービス説明 */}
          <CustomEffect>
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.8,
                mt: 2,
                width: "100%", // モバイルで幅を60%に調整
              }}
            >
              {description}
            </Typography>
          </CustomEffect>

          {/* More ボタン */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <CustomEffect>
              <MuiLink
                component="button"
                onClick={onClick} // onClickが渡されていれば実行
                underline="none"
                color="primary"
                sx={{ fontSize: "14px" }}
              >
                More &gt;
              </MuiLink>
            </CustomEffect>
          </Box>
        </Box>
      </Box>

      {/* スペースを持たせる（中央基準） */}
      <Box
        sx={{
          flex: "0 0 20%", // PCの基準用
        }}
      />
    </Box>
  );
};

export default ServiceItem;
