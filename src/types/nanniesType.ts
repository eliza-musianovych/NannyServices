interface Review {
   "reviewer": string,
    "rating": number,
    "comment": string,
};

export interface Nannie {
   "name": string,
    "avatar_url": string,
    "birthday": string,
    "experience": string,
    "reviews": Review[],
    "education": string,
    "kids_age": string,
    "price_per_hour": number,
    "location": string,
    "about": string,
    "characters": string[],
    "rating": number,
};

export type FilterType = 
| 'none'
| 'a-z'
| 'z-a'
| 'greater-10'
| 'less-10'
| 'popular'
| 'not-popular';