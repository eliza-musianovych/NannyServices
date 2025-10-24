import { createContext } from 'react';

import type { ThemeContextType } from '../types/themeTypes.ts'; 

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);