import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebar } from "./SidebarContext"; // SidebarContextをインポート

const SidebarToggleButton: React.FC = () => {
  const { toggleSidebar } = useSidebar(); // Sidebarのトグル関数を取得

  return (
    <IconButton
      onClick={toggleSidebar}
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 100,
      }}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default SidebarToggleButton;
