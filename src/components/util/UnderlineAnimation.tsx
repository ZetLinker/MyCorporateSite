export const underlineAnimationWhite = {
  position: "relative" as "relative",
  "::after": {
    content: '""',
    position: "absolute",
    bottom: "-4px",
    left: 0,
    width: "0%",
    height: "1.5px",
    backgroundColor: "white", // ホバー時の下線カラーを白に設定
    transition: "width 0.6s ease",
    opacity: 0.8,
  },
  "&:hover::after": {
    width: "100%",
  },
};

export const underlineAnimationBlack = {
  position: "relative" as "relative",
  "::after": {
    content: '""',
    position: "absolute",
    bottom: "-4px",
    left: 0,
    width: "0%",
    height: "2px",
    backgroundColor: "black", // ホバー時の下線カラーを白に設定
    transition: "width 0.8s ease",
    opacity: 0.8,
  },
  "&:hover::after": {
    width: "100%",
  },
};
