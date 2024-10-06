import React, { createContext, useState, useContext } from "react";

// SidebarContextのタイプ定義にsidebarWidthを追加
type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  sidebarWidth: string; // サイドバーの幅を管理するためのプロパティ
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // サイドバーの開閉をトグルする関数
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // サイドバーの幅を動的に設定（開いている場合は230px、閉じている場合は0）
  const sidebarWidth = isOpen ? "230px" : "0";

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, sidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
