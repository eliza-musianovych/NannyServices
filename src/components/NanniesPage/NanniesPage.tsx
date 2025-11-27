import css from './NanniesPage.module.css';

import { GoHeart } from "react-icons/go";
import { getNannies } from '../../services/nanniesService';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';


export default function NanniesPage() {
    const { data: nannies } = useQuery({
        queryKey: ['nannies'],
        queryFn: getNannies
    });

    const getAge = (dobString: string) => {
        const dob = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
        return age;
    }

    return(
        <section className={css.section}>
        <ul className={css.nanniesList}>
            {nannies?.map((nannie, index) => (
                <li 
                key={index}
                className={css.nannyItem}
                >
                    <div className={css.avatar}>
                        <img 
                        src={nannie.avatar_url} 
                        alt={nannie.name} 
                        className={css.img}
                        />
                    </div>
                    <div>
                        <div className={css.mainDetails}>
                            <div>
                                <p className={css.nanny}>Nanny</p>
                                <h2 className={css.nannyName}>{nannie.name}</h2>
                            </div>
                            <div className={css.detailsContainer}>
                                <ul className={css.detailsList}>
                                    <li className={css.listItem}>{nannie.location}</li>
                                    <li className={css.listItem}>Rating: {nannie.rating}</li>
                                    <li className={css.listItem}>Price / 1 hour: {nannie.price_per_hour}$</li>
                                </ul>
                                <GoHeart size={26}/>
                            </div>
                        </div>
                        <ul className={css.nannyDetails}>
                            <li className={css.detailItem}><span className={clsx(css.span, css.age)}>Age:</span> {getAge(nannie.birthday)}</li>
                            <li className={css.detailItem}><span className={css.span}>Experience:</span> {nannie.experience}</li>
                            <li className={css.detailItem}><span className={css.span}>Kids Age:</span> {nannie.kids_age}</li>
                            <li className={css.detailItem}><span className={css.span}>Characters:</span> {nannie.characters.join(", ")}</li>
                            <li className={css.detailItem}><span className={css.span}>Education:</span> {nannie.education}</li>
                        </ul>
                        <p className={css.about}>{nannie.about}</p>
                        <button className={css.readMore}>Read more</button>
                    </div>
                </li>
            ))}
        </ul>
        <button>Load more</button>
        </section>
    )
};