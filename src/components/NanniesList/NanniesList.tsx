import css from './NanniesList.module.css';
import NannyCard from '../NannyCard/NannyCard';
import * as Select from "@radix-ui/react-select";
import { 
    type FilterType,
    type Nannie
 } from '../../types/nanniesType';
import { 
    useState,
    useEffect
 } from 'react';

type NanniesListProps = {
    allNannies: Nannie[];
    removeFavorite: (name: string) => void;
    isFavorite?: (name: string) => boolean;
    addFavorite?: (nannie: Nannie) => void;
};

export default function NanniesList ({ allNannies, removeFavorite, isFavorite, addFavorite }: NanniesListProps) {  
        const [nannies, setNannies] = useState<Nannie[]>([]);
        const [page, setPage] = useState(1);
        const [filter, setFilter] = useState<FilterType>('a-z');
    
        const PageSize = 3;
    
        const applyFilters = (list: Nannie[]) => {
            let result = [...list];
    
            switch (filter) {
                case 'a-z':
                    result.sort((a, b) => 
                    a.name.localeCompare(b.name)
                );
                break;
    
                case 'z-a':
                    result.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
                break;
    
                case 'greater-10':
                    result = result.filter((nannie) => nannie.price_per_hour > 10);
                    break;
    
                case 'less-10':
                    result = result.filter((nannie) => nannie.price_per_hour < 10);
                    break;
    
                case 'popular':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
    
                case 'not-popular':
                    result.sort((a, b) => a.rating - b.rating);
                    break;
    
                case 'none': 
                default:
                    return list;
            }
    
            return result;
        };
    
        useEffect(() => {
            if (!allNannies) return;
    
            const filtered = applyFilters(allNannies);
    
            const firstThree = filtered.slice(0, PageSize);
            setNannies(firstThree);
        }, [allNannies, filter]);
    
        const handleLoadMore = () => {
            if (!allNannies) return;
    
            const filtered = applyFilters(allNannies);
            const nextPage = page + 1;
            setNannies(filtered.slice(0, nextPage * PageSize));
            setPage(nextPage);
        };
    
        const canLoadMore = allNannies ? nannies.length < applyFilters(allNannies).length : false;

    return (
        <section className={css.section}>
            <div className={css.filterContainer}>
                <p className={css.filter}>Filters</p>
                <Select.Root 
                value={filter} 
                onValueChange={(value) => setFilter(value as FilterType)}>
                    <Select.Trigger className={css.selector}>
                        <Select.Value />
                        <Select.Icon>▼</Select.Icon>
                    </Select.Trigger>
                        
                    <Select.Portal>
                    <Select.Content className={css.dropdown} sideOffset={14}>
                        <Select.Viewport>
                        <Select.Item value="a-z" className={css.option}>
                            <Select.ItemText>A → Z</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="z-a" className={css.option}>
                          <Select.ItemText>Z → A</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="popular" className={css.option}>
                          <Select.ItemText>Popular</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="not-popular" className={css.option}>
                          <Select.ItemText>Not popular</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="greater-10" className={css.option}>
                          <Select.ItemText>Greater than 10$</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="less-10" className={css.option}>
                          <Select.ItemText>Less than 10$</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="none" className={css.option}>
                          <Select.ItemText>Show all</Select.ItemText>
                        </Select.Item>
                         </Select.Viewport>
                     </Select.Content>
                     </Select.Portal>
                 </Select.Root>
            </div>
        <ul className={css.nanniesList}>
            {nannies?.map((nannie) => (
                <li 
                key={nannie.name}
                className={css.nannyItem}
                >
                    <NannyCard 
                    nannie={nannie} 
                    isFavorite={isFavorite?.(nannie.name) ?? true}
                    addFavorite={() => addFavorite?.(nannie)}
                    removeFavorite={() => removeFavorite(nannie.name)}
                    />
                </li>
            ))}
        </ul>
        {canLoadMore &&
        <button 
        className={css.loadMoreBtn}
        type='button'
        onClick={handleLoadMore}
        >
            Load more
        </button>}
        </section>
    )
}