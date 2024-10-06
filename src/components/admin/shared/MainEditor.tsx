import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TipTapEditor from "./TipTapEditor"; // TipTapEditor のインポート

interface MainEditorProps {
  content: string;
  setContent: (content: string) => void;
  error?: string; // エラーメッセージを受け取るプロップスを追加
}

const MainEditor: React.FC<MainEditorProps> = ({
  content,
  setContent,
  error,
}) => {
  const [editors, setEditors] = useState([{ id: 1, content }]);

  useEffect(() => {
    setEditors([{ id: 1, content }]);
  }, [content]);

  // エディタのコンテンツ変更ハンドラー
  const handleContentChange = (id: number, newContent: string) => {
    setEditors((prevEditors) =>
      prevEditors.map((editor) =>
        editor.id === id ? { ...editor, content: newContent } : editor
      )
    );
    setContent(newContent); // 親コンポーネントのcontentステートを更新
  };

  return (
    <Box>
      {editors.map((editor) => (
        <Box
          key={editor.id}
          sx={{
            border: `1px solid ${error ? "#d32f2f" : "#ddd"}`, // エラー時は赤色の枠線
            borderRadius: "4px",
            pt: 5,
            pb: 5,
            marginBottom: "16px",
            "& .ProseMirror": {
              outline: "none",
              minHeight: "150px", // 最小高さを設定
            },
          }}
        >
          <TipTapEditor
            content={editor.content}
            onChange={(newContent) =>
              handleContentChange(editor.id, newContent)
            }
          />
        </Box>
      ))}
      {error && (
        <Typography
          color="error"
          variant="body2" // 一貫した文字サイズに調整
          sx={{ mt: 1, fontSize: "0.875rem" }} // エラーメッセージのフォントサイズ
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default MainEditor;
