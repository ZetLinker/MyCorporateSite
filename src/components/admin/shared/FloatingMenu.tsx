import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TitleIcon from "@mui/icons-material/Title";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatBoldIcon from "@mui/icons-material/FormatBold"; // 太文字アイコンをインポート
import { Editor } from "@tiptap/react";
import LinkDialog from "./LinkDialog";

import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Firebase 関連のインポート
import { storage } from "../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 最大画像サイズの定義
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

type FloatingMenuProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  editor: Editor | null;
};

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  anchorEl,
  onClose,
  editor,
}) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // トリミング用の状態
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);

  // トリミングが変更されたかを追跡する状態
  const [isCropModified, setIsCropModified] = useState(false);
  const initialCropRef = useRef<Crop | null>(null);

  // 処理中の状態
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMenuItemClick = (action: string) => {
    if (!editor) return;

    switch (action) {
      case "heading1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        onClose();
        break;
      case "heading2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        onClose();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        onClose();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        onClose();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        onClose();
        break;
      case "horizontalRule":
        editor.chain().focus().setHorizontalRule().run();
        onClose();
        break;
      case "link":
        setIsLinkDialogOpen(true);
        break;
      case "image":
        fileInputRef.current?.click();
        onClose();
        break;
      case "bold": // 「太文字」アクションを追加
        editor.chain().focus().toggleBold().run();
        onClose();
        break;
      default:
        onClose();
        break;
    }
  };

  const handleLinkInsert = (url: string) => {
    if (!editor) return;

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }

    setIsLinkDialogOpen(false);
    onClose();
  };

  const handleLinkDialogClose = () => {
    setIsLinkDialogOpen(false);
    onClose();
  };

  // トリミング領域が変更されたかを比較する関数
  const isCropEqual = (a: Crop, b: Crop | null): boolean => {
    if (!b) return false;
    return (
      a.unit === b.unit &&
      a.x === b.x &&
      a.y === b.y &&
      a.width === b.width &&
      a.height === b.height
    );
  };

  // ファイル選択後の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
      });
      reader.readAsDataURL(file);

      // ファイル選択後にinputの値をリセット
      e.target.value = "";
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    imageRef.current = img;

    // 初期のトリミング領域を画像全体に設定
    const initialCrop: Crop = {
      unit: "%",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    };
    setCrop(initialCrop);
    initialCropRef.current = initialCrop;
    setIsCropModified(false); // 初期状態では変更されていない
  };

  const onCropComplete = (completedCrop: Crop) => {
    // 必要に応じて処理を追加
  };

  const onCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
    if (initialCropRef.current) {
      setIsCropModified(!isCropEqual(newCrop, initialCropRef.current));
    }
  };

  const handleCropConfirm = async () => {
    if (!editor || !imageRef.current) return;

    setIsProcessing(true); // 処理開始

    try {
      const processedImageBlob = await getCroppedImg(
        imageRef.current,
        crop,
        MAX_WIDTH,
        MAX_HEIGHT
      );

      const file = new File([processedImageBlob], `image_${Date.now()}.jpeg`, {
        type: "image/jpeg",
      });

      // 画像をアップロードしてURLを取得
      const imageUrl = await uploadImage(file);

      // 現在の選択位置を取得
      const { from } = editor.state.selection;

      // 画像を挿入し、その後にパラグラフを挿入してカーソルを移動
      editor
        .chain()
        .focus()
        .insertContentAt(from, [
          {
            type: "resizableImage",
            attrs: {
              src: imageUrl,
              width: "auto",
              alignment: "center",
            },
          },
          {
            type: "paragraph",
            content: [],
          },
        ])
        .setTextSelection(from + 2)
        .run();

      // 状態をリセット
      resetState();
    } catch (error) {
      console.error("画像の処理中にエラーが発生しました:", error);
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  const handleInsertWithoutCropping = async () => {
    if (!editor || !imageRef.current) return;

    setIsProcessing(true); // 処理開始

    try {
      const imageBlob = await getResizedImageBlob(
        imageRef.current,
        MAX_WIDTH,
        MAX_HEIGHT
      );

      const file = new File([imageBlob], `image_${Date.now()}.jpeg`, {
        type: "image/jpeg",
      });

      // 画像をアップロードしてURLを取得
      const imageUrl = await uploadImage(file);

      editor.chain().focus().setImage({ src: imageUrl }).run();

      // 状態をリセット
      resetState();
    } catch (error) {
      console.error("画像の挿入中にエラーが発生しました:", error);
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  // 状態をリセットする関数
  const resetState = () => {
    setImageSrc(null);
    setCrop({
      unit: "%",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    imageRef.current = null;

    // ファイル入力の値をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // トリミング変更の状態をリセット
    setIsCropModified(false);
    initialCropRef.current = null;
  };

  // トリミングされた画像を取得する関数
  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop,
    maxWidth: number,
    maxHeight: number
  ): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return Promise.reject("Canvasコンテキストが取得できませんでした");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    // canvasのサイズを設定
    canvas.width = crop.width * scaleX * pixelRatio;
    canvas.height = crop.height * scaleY * pixelRatio;
    canvas.style.width = `${crop.width * scaleX}px`;
    canvas.style.height = `${crop.height * scaleY}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    // 画像をcanvasに描画
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject("Canvasが空です");
          }
        },
        "image/jpeg",
        0.9 // 画質
      );
    });
  };

  // トリミングせずに画像をリサイズする関数
  const getResizedImageBlob = (
    image: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
  ): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return Promise.reject("Canvasコンテキストを取得できませんでした");
    }

    let width = image.naturalWidth;
    let height = image.naturalHeight;

    // リサイズロジック
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob !== null) {
            resolve(blob);
          } else {
            reject("Canvasが空です");
          }
        },
        "image/jpeg",
        0.9 // 画質
      );
    });
  };

  // 画像をFirebase Storageにアップロードする関数
  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `news/${file.name}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
      >
        {[
          { icon: <ImageIcon />, text: "画像", action: "image" },
          { icon: <LinkIcon />, text: "リンク埋め込み", action: "link" },
          { icon: <TitleIcon />, text: "大見出し", action: "heading1" },
          { icon: <TitleIcon />, text: "小見出し", action: "heading2" },
          { icon: <FormatBoldIcon />, text: "太文字", action: "bold" }, // 太文字メニュー項目を追加
          {
            icon: <FormatListBulletedIcon />,
            text: "箇条書きリスト",
            action: "bulletList",
          },
          {
            icon: <FormatListNumberedIcon />,
            text: "番号リスト",
            action: "orderedList",
          },
          { icon: <FormatQuoteIcon />, text: "引用", action: "blockquote" },
          {
            icon: <HorizontalRuleIcon />,
            text: "区切り線",
            action: "horizontalRule",
          },
        ].map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item.action)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "12px",
                    },
                  }}
                >
                  {item.text}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Menu>

      {/* ファイル選択用の非表示の input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* トリミングUIの表示 */}
      {imageSrc && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "80%",
              maxWidth: "600px",
              backgroundColor: "#fff",
              padding: 2,
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={onCropChange}
              onComplete={onCropComplete}
              minWidth={10}
              minHeight={10}
              keepSelection={true}
              ruleOfThirds
            >
              <img
                src={imageSrc}
                ref={imageRef}
                onLoad={onImageLoad}
                alt="Crop target"
                style={{ maxWidth: "100%" }}
              />
            </ReactCrop>
            {/* ローディングインジケーターの追加 */}
            {isProcessing && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              mt: 2,
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // モバイルでは縦並び、PCでは横並び
              gap: { xs: 2, sm: 0 }, // モバイルではボタン間にスペースを追加
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCropConfirm}
              disabled={!isCropModified || isProcessing} // トリミングが変更されていない、または処理中の場合は無効
            >
              トリミングして挿入
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleInsertWithoutCropping}
              sx={{ ml: { xs: 0, sm: 2 } }} // モバイルでは左マージンを0に
              disabled={isProcessing} // 処理中の場合は無効
            >
              トリミングせずに挿入
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={resetState}
              sx={{ ml: { xs: 0, sm: 2 } }} // モバイルでは左マージンを0に
              disabled={isProcessing} // 処理中の場合は無効
            >
              キャンセル
            </Button>
          </Box>
        </Box>
      )}

      {/* リンク挿入用のダイアログ */}
      <LinkDialog
        open={isLinkDialogOpen}
        onClose={handleLinkDialogClose}
        onSubmit={handleLinkInsert}
      />
    </>
  );
};

export default FloatingMenu;
