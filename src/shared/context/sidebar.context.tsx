"use client";
import { FC, ReactNode, useState, createContext, useMemo, useCallback, useContext, useEffect } from "react";
import getScreenSize from "../common/get-screen-type";
export type SidebarVariant = "persist" | "close";
interface SidebarContext {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  sidebarVariant: SidebarVariant;
  setSidebarVariant: (variant: SidebarVariant) => void;
}

const SidebarContext = createContext<SidebarContext>({} as SidebarContext);

export const useSidebarContext = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children?: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const isMobile = getScreenSize().isTab;
  const [sidebarToggle, setSidebarToggle] = useState(!isMobile);
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariant>("persist");
  const toggleSidebar = useCallback(() => setSidebarToggle(!sidebarToggle), [sidebarToggle]);
  const closeSidebar = useCallback(() => setSidebarToggle(true), []);
  const contextValue = useMemo(
    () => ({
      sidebarToggle,
      toggleSidebar,
      closeSidebar,
      setSidebarVariant,
      sidebarVariant,
    }),
    [sidebarToggle, toggleSidebar, closeSidebar, sidebarVariant, setSidebarVariant]
  );

  useEffect(() => {
    setSidebarToggle(!isMobile);
  }, [isMobile]);

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};
