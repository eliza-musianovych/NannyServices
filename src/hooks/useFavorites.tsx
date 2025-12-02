import { 
    useState,
    useEffect
 } from "react";
import {type Nannie } from "../types/nanniesType";

const FavoritesKey = 'favoriteNannies';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Nannie[]>(() => {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem(FavoritesKey);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(FavoritesKey, JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (nannie: Nannie) => {
        setFavorites(prev => {
            if(prev.find(n => n.name === nannie.name)) return prev;
            return [...prev, nannie];
        });
    };

    const removeFavorite = (name: string) => {
        setFavorites(prev => prev.filter(n => n.name !== name));
    };

    const isFavorite = (name: string) => {
        return favorites.some(n => n.name === name);
    };

    return { favorites, addFavorite, removeFavorite, isFavorite};
};