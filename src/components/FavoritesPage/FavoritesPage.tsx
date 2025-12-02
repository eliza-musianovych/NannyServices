import { useFavorites } from '../../hooks/useFavorites';
import NanniesList from '../NanniesList/NanniesList';

export default function FavoritesPage() {
    const { favorites, removeFavorite, } = useFavorites();

    return (
        <NanniesList 
        allNannies={favorites}
        removeFavorite={removeFavorite} 
        />
    )
};