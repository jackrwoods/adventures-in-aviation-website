"use client";

import React, { createContext, useContext, useState } from "react";

type UIState = {
  mobileMenuOpen: boolean;
  activeNav: string;
  aboutTocOpen: boolean;
};

type UIStateContextType = {
  state: UIState;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveNav: (nav: string) => void;
  setAboutTocOpen: (open: boolean) => void;
};

const UIStateContext = createContext<UIStateContextType | null>(null);

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UIState>({
    mobileMenuOpen: false,
    activeNav: "",
    aboutTocOpen: false,
  });

  const setMobileMenuOpen = (open: boolean) =>
    setState((prev) => ({ ...prev, mobileMenuOpen: open }));

  const setActiveNav = (nav: string) =>
    setState((prev) => ({ ...prev, activeNav: nav }));

  const setAboutTocOpen = (open: boolean) =>
    setState((prev) => ({ ...prev, aboutTocOpen: open }));

  return (
    <UIStateContext.Provider value={{ state, setMobileMenuOpen, setActiveNav, setAboutTocOpen }}>
      {children}
    </UIStateContext.Provider>
  );
}

export function useUIState() {
  const ctx = useContext(UIStateContext);
  if (!ctx) throw new Error("useUIState must be used within UIStateProvider");
  return ctx;
}
