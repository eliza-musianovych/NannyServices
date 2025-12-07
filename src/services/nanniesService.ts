import { 
    ref,
    get,
} from 'firebase/database';
import { db } from './firebase';
import type { Nannie } from '../types/nanniesType';

export const getNannies = async (): Promise<Nannie[]> => {
    const snapshot = await get(ref(db, "/"));
    const data = snapshot.val();
    
    return Object.entries(data)
        .filter(([key, value]) => 
            !isNaN(Number(key)) && typeof value === "object"
        )
        .map(([, value]) => value as Nannie);
};

