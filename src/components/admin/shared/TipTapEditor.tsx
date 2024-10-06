import React, { useEffect, useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import ResizableImage from "./ResizableImage"; // カスタムの画像拡張をインポート
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FloatingMenu from "./FloatingMenu"; // FloatingMenu のインポート
import { useLocation } from "react-router-dom"; // useLocation をインポート

type TipTapEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasFocusedOnce, setHasFocusedOnce] = useState(false); // フォーカスが一度でも当たったかどうか
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(
    null
  );
  const [lastPosition, setLastPosition] = useState<{
    top: number;
    height: number;
  }>({
    top: 11.0,
    height: 0,
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); // useLocation を使用

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Mention.configure({
        suggestion: {
          items: ({ query }) => {
            return ["@user1", "@user2", "@tag1"].filter((item) =>
              item.toLowerCase().startsWith(query.toLowerCase())
            );
          },
        },
      }),
      ResizableImage, // 画像リサイズ機能を持つカスタム拡張
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    onFocus: () => {
      setIsFocused(true);
      setHasFocusedOnce(true); // フォーカスが当たったことを記録
      setTimeout(updateFocusedElement, 0); // 遅延実行
    },
    onBlur: () => {
      setIsFocused(false);
      // フォーカスが外れても focusedElement や lastPosition をリセットしない
    },
    onSelectionUpdate: () => {
      updateFocusedElement();
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false); // falseは新しい履歴ステップを追加しないため
    }
  }, [content, editor]);

  useEffect(() => {
    if (!focusedElement) {
      setLastPosition((prevPosition) => ({
        ...prevPosition, // 現在のtopの値を維持
      }));
    }
  }, [focusedElement]);

  useEffect(() => {
    // 画面遷移後に lastPosition を初期化
    setLastPosition({ top: 11.0, height: 0 });
  }, [location]);

  const updateFocusedElement = () => {
    if (!editor) return;

    // 現在の選択を取得
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    // 選択範囲の開始位置のノードを取得
    const range = selection.getRangeAt(0);
    let node = range.startContainer as Node;

    // テキストノードの場合は親要素を取得
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode as Node;
    }

    // ブロック要素を探す
    while (node && node !== editor.view.dom) {
      if (node instanceof HTMLElement) {
        const display = window.getComputedStyle(node).display;
        if (display === "block" || display === "list-item") {
          break;
        }
      }
      node = node.parentNode as Node;
    }

    if (node && node !== editor.view.dom && node instanceof HTMLElement) {
      setFocusedElement(node);
      setLastPosition({ top: node.offsetTop, height: node.offsetHeight });
    }
  };

  useEffect(() => {
    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setTimeout(updateFocusedElement, 50); // フォーカス更新
      }
    };

    editor?.view.dom.addEventListener("keydown", handleEnterPress);
    return () => {
      editor?.view.dom.removeEventListener("keydown", handleEnterPress);
    };
  }, [editor]);

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); // デフォルト動作を防止
    event.stopPropagation(); // イベントの伝播を止める
    if (menuAnchor) {
      setMenuAnchor(null);
    } else {
      setMenuAnchor(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const isMenuOpen = Boolean(menuAnchor);

  return (
    <Box
      ref={editorRef}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        paddingLeft: "50px",
      }}
    >
      {/* フローティングボタン */}
      <IconButton
        onMouseDown={handleMenuToggle}
        disableRipple
        disableFocusRipple
        sx={{
          position: "absolute",
          left: "15px",
          top:
            (focusedElement ? focusedElement.offsetTop : lastPosition.top) +
            ((focusedElement
              ? focusedElement.offsetHeight
              : lastPosition.height) /
              2 -
              17.5), // ボタンの高さの半分を引く
          boxShadow: 1,
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            boxShadow: 1,
          },
          "&:active": {
            backgroundColor: "white",
            boxShadow: 1,
          },
        }}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.6s",
            transform: isMenuOpen ? "rotate(45deg)" : "rotate(0deg)",
            lineHeight: 0,
            marginTop: "2px",
          }}
        >
          <AddIcon />
        </span>
      </IconButton>

      {/* フローティングメニュー */}
      <FloatingMenu
        anchorEl={menuAnchor}
        onClose={handleMenuClose}
        editor={editor}
      />

      {/* 縦ラインの表示 */}
      {hasFocusedOnce && (
        <Box
          sx={{
            position: "absolute",
            left: "60px",
            top: focusedElement
              ? focusedElement.offsetTop || lastPosition.top
              : lastPosition.top,
            height: focusedElement
              ? focusedElement.offsetHeight || lastPosition.height
              : lastPosition.height,
            width: "2.5px",
            backgroundColor: "#ddd",
            zIndex: 5,
            mt: 0.5,
          }}
        />
      )}

      {/* プレースホルダーとエディター */}
      <Box
        sx={{
          flex: 1,
          marginLeft: "20px",
          position: "relative",
          "& .ProseMirror img": {
            maxWidth: "90%",
            height: "auto",
          },
          "& .ProseMirror": {
            outline: "none",
            boxShadow: "none",
            border: "none",
            maxHeight: "auto",
            fontSize: "16px",
            lineHeight: "1.5",
            "& p, & h1, & h2, & blockquote, & ul, & ol": {
              margin: "4px 0",
              position: "relative",
            },
            "& blockquote": {
              borderLeft: "4px solid #ccc",
              paddingLeft: "16px",
              margin: "8px 0",
              backgroundColor: "#f9f9f9",
              color: "#555",
            },
          },
          "&::before": {
            content:
              editor?.isEmpty && !isFocused
                ? '"最新のNEWSを投稿しましょう！"'
                : '""',
            position: "absolute",
            left: "5px",
            top: "5px",
            fontSize: "14px",
            color: "#aaa",
            pointerEvents: "none",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default TipTapEditor;
