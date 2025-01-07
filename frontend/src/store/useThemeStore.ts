import { create } from "zustand";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

// TODO - create endpoint to save theme
export const useThemeStore = create<ThemeState>()((set) => ({
  theme: localStorage.getItem("theme") || "dim",

  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
