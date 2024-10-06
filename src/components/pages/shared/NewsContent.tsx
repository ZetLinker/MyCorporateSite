import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import FadeInOnScroll from "../../util/FadeInOnScroll";
import { Timestamp } from "firebase/firestore"; // Timestampをインポート

type NewsItem = {
  id: string;
  date: Timestamp;
  tag: "お知らせ" | "実績" | "イベント";
  title: string;
  content: string;
  isDelete: boolean;
  isDisplay: boolean;
  isDraft: boolean;
};

type NewsContentProps = {
  newsItem: NewsItem;
  isEditable?: boolean;
  onSave?: () => void;
};

const NewsContent: React.FC<NewsContentProps> = ({
  newsItem,
  isEditable,
  onSave,
}) => {
  const [parsedContent, setParsedContent] = useState<JSX.Element[]>([]);

  // コンテンツのHTMLをパースしてJSXに変換する
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(newsItem.content, "text/html");

    // 子要素ごとにFadeInOnScrollを適用して配列に保存
    const elementsArray: JSX.Element[] = Array.from(doc.body.childNodes).map(
      (node, index) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          return (
            <FadeInOnScroll key={index}>
              <Box dangerouslySetInnerHTML={{ __html: element.outerHTML }} />
            </FadeInOnScroll>
          );
        } else if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          return text ? (
            <FadeInOnScroll key={index}>{text}</FadeInOnScroll>
          ) : null;
        }
        return null;
      }
    );
    setParsedContent(elementsArray.filter((el) => el !== null)); // null 要素は除外
  }, [newsItem.content]);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 50,
        textAlign: "left",
        pt: 7,
        pb: 7,
        width: { xs: "90%", sm: "90%", md: "60%" },
        margin: "0 auto",
      }}
    >
      {/* タイトル部分 */}
      <FadeInOnScroll>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontSize: { xs: "14px", sm: "18px" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography component="span" sx={{ mr: 2 }}>
            Title:
          </Typography>
          <Typography
            component="span"
            sx={{ fontWeight: "bold", fontSize: { xs: "14px", sm: "18px" } }}
          >
            {newsItem.title}
          </Typography>
        </Typography>
      </FadeInOnScroll>

      {/* パースしたコンテンツを表示 */}
      <Box
        sx={{
          fontSize: { xs: "10px", sm: "14px" },
          "& img": {
            maxWidth: "100%",
            height: "auto",
          },
          "& h1": {
            fontSize: { xs: "14px", sm: "18px" },
          },
          "& h2": {
            fontSize: { xs: "12px", sm: "16px" },
          },
          "& p": {
            fontSize: { xs: "10px", sm: "14px" },
          },
        }}
      >
        {parsedContent}
      </Box>

      {/* 公開日部分 */}
      <FadeInOnScroll>
        <Box
          sx={{
            mt: 5,
            textAlign: "right",
            fontSize: { xs: "8px", sm: "12px" },
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            component="span"
            sx={{ mr: 2, fontSize: { xs: "8px", sm: "12px" } }}
          >
            公開日:
          </Box>
          <Box component="span" sx={{ fontSize: { xs: "8px", sm: "12px" } }}>
            {newsItem.date.toDate().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Box>
        </Box>
      </FadeInOnScroll>

      {/* 編集可能な場合の保存ボタン */}
      {isEditable && (
        <FadeInOnScroll>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <button onClick={onSave}>保存</button>
          </Box>
        </FadeInOnScroll>
      )}
    </Box>
  );
};

export default NewsContent;
