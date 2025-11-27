import { 
    createContext,
} from "react";
import {type AuthContextType } from "../types/authTypes";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

