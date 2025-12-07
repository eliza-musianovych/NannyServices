import { 
    ref,
    get,
} from 'firebase/database';
import { db } from './firebase';
import type { Nannie } from '../types/nanniesType';

export const getNannies = async (): Promise<Nannie[]> => {
    const snapshot = await get(ref(db, "/"));
    const data = snapshot.val();
    
    return Object.values(data)
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => item as Nannie); 
};

