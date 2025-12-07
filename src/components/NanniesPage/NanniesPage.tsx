import { getNannies } from '../../services/nanniesService';
import { useQuery } from '@tanstack/react-query';
import NanniesList from '../NanniesList/NanniesList';
import { useFavorites } from '../../hooks/useFavorites';

export default function NanniesPage() {
    const { data: allNannies, isLoading } = useQuery({
        queryKey: ['nannies'],
        queryFn: getNannies,
        staleTime: Infinity
    });

    const { removeFavorite, isFavorite, addFavorite } = useFavorites();

    if (isLoading) return <p>Loading...</p>;

    return(
        <NanniesList 
        allNannies={allNannies || []}
        removeFavorite={removeFavorite}
        isFavorite={isFavorite}
        addFavorite={addFavorite}
        /> 
    )
};