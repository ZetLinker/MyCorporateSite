import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoImage from "../assets/logo.svg";

// フェードインアニメーションの定義
const fadeInKeyframes = {
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "@keyframes underlineExpand": {
    from: { width: "0%" },
    to: { width: "100%" },
  },
};

// 共通のフェードインアニメーション設定
const fadeInAnimation = "fadeIn 1s ease";

// PC版とモバイル版のメニュー項目を別々に定義
const menuItemsPC: { text: string; link: string }[] = [
  { text: "HOME", link: "/" },
  { text: "SERVICE", link: "/service" },
  { text: "ABOUT US", link: "/aboutus" },
  { text: "NEWS", link: "/news" },
  { text: "CONTACT", link: "/contact" },
];

const menuItemsMobile: { text: string; link: string }[] = [
  { text: "HOME", link: "/" },
  { text: "SERVICE", link: "/service" },
  { text: "ABOUT US", link: "/aboutus" },
  { text: "NEWS", link: "/news" },
  { text: "CONTACT", link: "/contact" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation(); // 現在のパスを取得

  // Hero セクションの可視状態を監視
  useEffect(() => {
    const heroElement = document.getElementById("heroSection");

    if (heroElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsHeroVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(heroElement);

      return () => {
        if (heroElement) observer.unobserve(heroElement);
      };
    } else {
      setIsHeroVisible(false);
    }
  }, [location.pathname]);

  // メニューの開閉を制御する関数
  const toggleMenu = (forceClose?: boolean) => {
    if (forceClose || menuOpen) {
      document.body.style.overflow = "auto";
      setMenuOpen(false);
    } else {
      document.body.style.overflow = "hidden";
      setMenuOpen(true);
    }
  };

  // ページ遷移時にメニューを閉じ、スクロールをリセットする
  useEffect(() => {
    toggleMenu(true);
    window.scrollTo(0, 0);
  }, [location]);

  // ヘッダーのスタイル
  const headerStyles = {
    position: "fixed" as "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: menuOpen ? "100%" : "95%",
    zIndex: 1000,
    mt: menuOpen ? 0 : 2,
    backgroundColor: isHeroVisible ? "transparent" : "rgba(255, 255, 255, 0.9)",
    color: isHeroVisible ? "black" : "black",
    backdropFilter: isHeroVisible ? "none" : "blur(1px)",
    borderRadius: "5px",
    transition:
      "background-color 0.6s, color 0.6s, backdrop-filter 0.6s, border 0.6s ease, width 0.6s, margin-top 0.6s",
    border: isHeroVisible ? "1px solid transparent" : "1px solid black",
    ...fadeInKeyframes,
  };

  // 共通のリンクスタイル
  const commonLinkStyles = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    animation: fadeInAnimation,
  };

  // テキストスタイル
  const textStyles = {
    color: isHeroVisible ? "white" : "black",
    fontWeight: 600,
    fontSize: { xs: "12px", sm: "clamp(12px, 1.0vw, 16px)" },
    letterSpacing: {
      xs: "0.1em",
      sm: "0.1em",
    },
    transition: "color 0.6s ease",
  };

  // 下線のアニメーション設定
  const getUnderlineAnimation = (color: string) => ({
    position: "relative" as "relative",
    "::after": {
      content: '""',
      position: "absolute",
      bottom: "-4px",
      left: 0,
      width: "0%",
      height: "1.5px",
      backgroundColor: color,
      transition: "width 0.8s ease, background-color 0.6s ease",
      opacity: 0.8,
    },
    "&:hover::after": {
      width: "100%",
    },
  });

  return (
    <>
      {/* ヘッダー */}
      <Box component="header" sx={headerStyles}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "5px", sm: "10px" },
            marginX: "auto",
            width: "100%",
            maxWidth: "2000px",
            backgroundColor: "transparent",
            mt: { xs: 0, sm: 0.5 },
            mb: { xs: 0, sm: 0.5 },
          }}
        >
          {/* ロゴと社名 */}
          <MuiLink
            component={RouterLink}
            to="/"
            sx={commonLinkStyles}
            onClick={() => toggleMenu(true)}
          >
            <Box
              component="img"
              src={logoImage}
              alt="logo.svg"
              sx={{
                width: {
                  xs: "25px",
                  sm: "clamp(30px, 3.0vw, 40px)",
                },
                ml: { xs: 1, md: 5 },
                height: "auto",
                animation: fadeInAnimation,
                transition: "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                "&:hover": {
                  transform: "rotate(100deg)",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                component="span"
                sx={{
                  ...textStyles,
                  fontSize: { xs: "16px", md: "clamp(16px, 1.0vw, 22px)" },
                  marginLeft: { xs: "12px", md: "clamp(12px, 1.0vw, 18px)" },
                  letterSpacing: {
                    xs: "0.1em",
                    sm: "0.1em",
                  },
                  lineHeight: 1, // 行間を詰める
                }}
              >
                ZetLinker
                <br />
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "8px", md: "clamp(8px, 0.8vw, 10px)" },
                    color: isHeroVisible ? "white" : "#e64525",
                    mt: -0.5, // 上の文字との間隔を詰める
                    lineHeight: 1, // 行間を詰める
                    fontWeight: 600,
                    transition: "color 0.6s ease",
                  }}
                >
                  地域のデジタルパートナー
                </Box>
              </Box>
            </Box>
          </MuiLink>

          {/* メニューの表示 */}
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleMenu()}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // デスクトップ用メニュー
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2, md: 4 },
                mr: { sm: 2, md: 5 },
              }}
            >
              {menuItemsPC.map((item, index) => {
                // 現在のページにいる場合の文字色
                const isActive = location.pathname === item.link;
                const linkColor = isActive
                  ? "#e64525"
                  : isHeroVisible
                  ? "white"
                  : "black";
                return (
                  <MuiLink
                    key={index}
                    component={RouterLink}
                    to={item.link}
                    sx={{
                      ...commonLinkStyles,
                      ...textStyles,
                      ...getUnderlineAnimation(linkColor),
                      color: linkColor,
                      letterSpacing: {
                        xs: "0.1em",
                        sm: "0.1em",
                      },
                    }}
                  >
                    {item.text}
                  </MuiLink>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      {/* モバイル用オーバーレイメニュー */}
      {isMobile && (
        <Fade in={menuOpen}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "101vw",
              height: "101vh",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              zIndex: 2000,
              backdropFilter: "blur(10px)",
            }}
          >
            {/* オーバーレイメニュー内のコンテンツ */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                mt: 2,
              }}
            >
              {/* ロゴと閉じるボタン */}
              <MuiLink
                component={RouterLink}
                to="/"
                sx={commonLinkStyles}
                onClick={() => toggleMenu(true)}
              >
                <Box
                  component="img"
                  src={logoImage}
                  alt="logo.svg"
                  sx={{
                    width: "25px",
                    ml: 2.5,
                    height: "auto",
                    animation: fadeInAnimation,
                    transition: "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    "&:hover": {
                      transform: "rotate(100deg)",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      ...textStyles,
                      fontSize: { xs: "16px", md: "clamp(16px, 1.0vw, 22px)" },
                      marginLeft: {
                        xs: "12px",
                        md: "clamp(12px, 1.0vw, 18px)",
                      },
                      letterSpacing: {
                        xs: "0.1em",
                        sm: "0.1em",
                      },
                      lineHeight: 1, // 行間を詰める
                      color: "white",
                    }}
                  >
                    ZetLinker
                    <br />
                    <Box
                      component="span"
                      sx={{
                        fontSize: { xs: "8px", md: "clamp(8px, 0.8vw, 10px)" },
                        color: "white",
                        mt: -0.5, // 上の文字との間隔を詰める
                        lineHeight: 1, // 行間を詰める
                        fontWeight: 600,
                        transition: "color 0.6s ease",
                      }}
                    >
                      地域のデジタルパートナー
                    </Box>
                  </Box>
                </Box>
              </MuiLink>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={() => toggleMenu()}
                sx={{ mr: 2.5 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* モバイルメニュー項目 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              {menuItemsMobile.map((item, index) => (
                <MuiLink
                  key={index}
                  component={RouterLink}
                  to={item.link}
                  sx={{
                    textDecoration: "none",
                    fontSize: "16px",
                    mb: 8,
                    color:
                      location.pathname === item.link ? "#e64525" : "white",
                    ...getUnderlineAnimation(
                      location.pathname === item.link ? "#e64525" : "white"
                    ),
                    letterSpacing: {
                      xs: "0.1em",
                      sm: "0.1em",
                    },
                    transition: "color 0.6s ease",
                  }}
                  onClick={() => toggleMenu(true)}
                >
                  {item.text}
                </MuiLink>
              ))}
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  right: { xs: "10px", md: "20px" }, // 画面の右端からの距離を設定
                  bottom: { xs: "10px", md: "20px" }, // 画面の下端からの距離を設定
                  fontSize: { xs: "10px", md: "clamp(8px, 0.8vw, 10px)" },
                  fontWeight: 600,
                  transition: "color 0.6s ease",
                  zIndex: 10, // 必要に応じて他の要素より上に表示
                  textAlign: "right", // テキストの位置を調整
                  mb: 1,
                  mr: 1,
                }}
              >
                ZetLinker at 埼玉県志木市
              </Box>
            </Box>
          </Box>
        </Fade>
      )}
    </>
  );
};

export default Header;
