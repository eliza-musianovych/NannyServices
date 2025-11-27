import { 
    useEffect, 
    useState 
} from "react";

import type { Theme } from '../../types/themeTypes';
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeProvider ({ children }: {children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) || 'red'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const cycleTheme = () => {
        setTheme(prev => 
            prev === 'red' ? 'blue' : prev === 'blue' ? 'green' : 'red'
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, cycleTheme }} >
            {children}
        </ThemeContext.Provider>
    );
};

