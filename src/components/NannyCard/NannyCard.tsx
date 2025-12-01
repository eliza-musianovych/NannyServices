import css from "./NannyCard.module.css";
import clsx from 'clsx';

import { useState } from "react";

import type { Nannie } from "../../types/nanniesType";
import { 
    GoHeart, 
    GoHeartFill
} from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa6";
import Modal from "../Modal/Modal";

type NannyCardProps = {
    nannie: Nannie
};

export default function NannyCard ({ nannie }: NannyCardProps) {
        const [readMore, setReadMore] = useState(false);
    
        const handleReadMore = () => {
            setReadMore(true);
        };
    
        const [isFavourite, setIsFavourite] = useState(false);

        const [isModalOpen, setIsModalOpen] = useState(false);

        const getAge = (dobString: string) => {
            const dob = new Date(dobString);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
            return age;
        };
    
        const capitalizeWords = (characters: string[]) => {
            return characters.map(
                word => word.charAt(0).toUpperCase() + word.slice(1)
            );
        };
    
        const formatRating = (value: number) => {
            return Number.isInteger(value) ? value.toFixed(1) : value;
        };

    return (
        <>
        <div className={css.avatar}>
                        <img 
                        src={nannie.avatar_url} 
                        width={96}
                        height={96}
                        alt={nannie.name} 
                        className={css.img}
                        />
                    </div>
                    <div>
                        <div className={css.mainDetails}>
                            <div>
                                <p className={css.nanny}>Nanny</p>
                                <h2>{nannie.name}</h2>
                            </div>
                            <div className={css.detailsContainer}>
                                <ul className={css.detailsList}>
                                    <li className={css.listItem}>
                                        <GrLocation 
                                        size={16}
                                        className={css.locationIcon}
                                        />
                                        {nannie.location}
                                    </li>
                                    <li className={clsx(css.listItem, css.borderItem)}>
                                        <FaStar 
                                        size={16}
                                        className={css.starIcon}
                                        />
                                        Rating: {formatRating(nannie.rating)}
                                    </li>
                                    <li className={clsx(css.listItem, css.borderItem)}>
                                        Price / 1 hour: 
                                        <span className={css.price}>{ nannie.price_per_hour}$</span>
                                    </li>
                                </ul>
                                {!isFavourite ? 
                                <GoHeart size={26}/> :
                                <GoHeartFill size={26}/>}
                            </div>
                        </div>
                        <ul className={css.nannyDetails}>
                            <li className={css.detailItem}><span className={css.span}>Age:</span> <span className={css.age}>{getAge(nannie.birthday)}</span></li>
                            <li className={css.detailItem}><span className={css.span}>Experience:</span> {nannie.experience}</li>
                            <li className={css.detailItem}><span className={css.span}>Kids Age:</span> {nannie.kids_age}</li>
                            <li className={css.detailItem}><span className={css.span}>Characters:</span> {capitalizeWords(nannie.characters).join(", ")}</li>
                            <li className={css.detailItem}><span className={css.span}>Education:</span> {nannie.education}</li>
                        </ul>
                        <p className={css.about}>{nannie.about}</p>
                        {!readMore ?
                        <button 
                        className={css.readMore}
                        type='button'
                        onClick={handleReadMore}
                        >
                            Read more
                        </button> :
                        <>
                        <ul className={css.reviewList}>
                            {nannie.reviews.map((review) => (
                                <li 
                                key={review.reviewer}
                                className={css.reviewItem}
                                >
                                    <div className={css.reviewerContainer}>
                                        <div className={css.reviewerFirstLetter}>{review.reviewer.slice(0, 1)}</div>
                                        <div className={css.reviewer}>
                                            <p className={css.reviewerName}>{review.reviewer}</p>
                                            <p className={css.rating}>
                                                <FaStar
                                                size={16}
                                                className={css.starIcon}
                                                />
                                                {formatRating(review.rating)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={css.comment}>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                        <button 
                        type='button'
                        className={css.btnAppointment}
                        onClick={() => setIsModalOpen(true)}
                        >
                            Make an appointment
                        </button>
                        </>
                        }
                    </div>
                    {isModalOpen && 
                    <Modal 
                    mode='appointment'
                    onClose={() => setIsModalOpen(false)}
                    nannie={nannie}
                    />
                }
        </>
    )
}