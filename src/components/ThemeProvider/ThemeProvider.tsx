import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import type { Theme } from "../../types/themeTypes";

type ThemeProviderProps = {
    children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem("theme") as Theme) || "red"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const cycleTheme = () => {
        setTheme(prev =>
            prev === "red" ? "blue" : prev === "blue" ? "green" : "red"
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
