import css from './NanniesPage.module.css';

import { getNannies } from '../../services/nanniesService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { type Nannie } from '../../types/nanniesType';
import NannyCard from '../NannyCard/NannyCard';


export default function NanniesPage() {
    const { data: allNannies, isLoading } = useQuery({
        queryKey: ['nannies'],
        queryFn: getNannies,
        staleTime: Infinity
    });

    const [nannies, setNannies] = useState<Nannie[]>([]);
    const [page, setPage] = useState(1);
    const PageSize = 3;

    useEffect(() => {
        if (!allNannies) return;

        const firstThree = allNannies.slice(0, PageSize);
        setNannies(firstThree);
    }, [allNannies]);

    const handleLoadMore = () => {
        if (!allNannies) return;

        const nextPage = page + 1;
        setNannies(allNannies.slice(0, nextPage * PageSize));
        setPage(nextPage);
    };

    const canLoandMore = allNannies && nannies.length < allNannies.length;

    if (isLoading) return <p>Loading...</p>;

    return(
        <section className={css.section}>
        <ul className={css.nanniesList}>
            {nannies?.map((nannie, index) => (
                <li 
                key={index}
                className={css.nannyItem}
                >
                    <NannyCard nannie={nannie}/>
                </li>
            ))}
        </ul>
        {canLoandMore &&
        <button 
        className={css.loadMoreBtn}
        type='button'
        onClick={handleLoadMore}
        >
            Load more
        </button>}
        </section>
    )
};