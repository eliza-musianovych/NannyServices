export type Theme = 'red' | 'blue' | 'green';

export type ThemeContextType = {
    theme: Theme;
    cycleTheme: () => void;
};