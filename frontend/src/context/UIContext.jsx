import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "epicmanagement-theme-mode";

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};

export const TABLE_FILTERS = [
  { value: "all", label: "All Records" },
  { value: "positive", label: "Positive Status" },
  { value: "attention", label: "Needs Attention" },
];

const UIContext = createContext(null);

function readInitialTheme() {
  if (typeof window === "undefined") {
    return THEME_MODES.LIGHT;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === THEME_MODES.DARK || storedTheme === THEME_MODES.LIGHT) {
    return storedTheme;
  }

  return THEME_MODES.LIGHT;
}

export function UIProvider({ children }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [tableFilter, setTableFilter] = useState(TABLE_FILTERS[0].value);
  const [themeMode, setThemeMode] = useState(readInitialTheme);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);

    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(themeMode === THEME_MODES.DARK ? "theme-dark" : "theme-light");
  }, [themeMode]);

  const value = useMemo(
    () => ({
      globalSearch,
      setGlobalSearch,
      tableFilter,
      setTableFilter,
      tableFilterOptions: TABLE_FILTERS,
      themeMode,
      isDarkMode: themeMode === THEME_MODES.DARK,
      toggleThemeMode: () =>
        setThemeMode((currentTheme) => (currentTheme === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK)),
    }),
    [globalSearch, tableFilter, themeMode],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
}
