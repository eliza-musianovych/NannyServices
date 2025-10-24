import css from './HomePage.module.css';

import { Link } from 'react-router-dom';
import { ImArrowUpRight2 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export default function HomePage() {
    return (
        <section className={css.section}>
            <div className={css.container}>
                <div className={css.titleContainer}>
                    <h1 className={css.title}>Make Life Easier for the Family:</h1>
                    <p className={css.text}>Find Babysitters Online for All Occasions</p>
                </div>
                <Link 
                to={'/nannies'}
                className={css.link}
                >
                    Get started
                    <ImArrowUpRight2
                    color='var(--color-background-aditional)' 
                    size={16}
                    className={css.iconLink}
                    />
                </Link>
            </div>

            <div className={css.statisticContainer}>
                <div className={css.icon}>
                    <FaCheck
                    color='var(--color-background-aditional)' 
                    width={20} 
                    height={15}
                    />
                </div>
                <div className={css.textContainer}>
                    <p className={css.statistic}>Experienced nannies</p>
                    <p className={css.number}>15,000</p>
                </div>
            </div>
        </section>
    )
}