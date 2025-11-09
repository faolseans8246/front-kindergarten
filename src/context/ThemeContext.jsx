import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ mode: "auto", setMode: ()=>{} });

const applyMode = (mode) => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("theme-dark");
    else if (mode === "light" || mode === "default") root.classList.remove("theme-dark");
    else if (mode === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) root.classList.add("theme-dark");
        else root.classList.remove("theme-dark");
    }
};

export function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        if (typeof window === "undefined") {
            return "dark";
        }
        return localStorage.getItem("themeMode") || "dark";
    });

    useEffect(() => {
        applyMode(mode);
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    useEffect(() => {
        if (mode === "auto") {
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = () => applyMode("auto");
            media.addEventListener("change", handler);
            return () => media.removeEventListener("change", handler);
        }
    }, [mode]);

    const value = useMemo(() => ({ mode, setMode }), [mode]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useThemeMode = () => useContext(ThemeContext);
