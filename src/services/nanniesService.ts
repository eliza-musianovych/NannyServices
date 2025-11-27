import { 
    ref,
    get,
    set,
    remove, 
    onValue
} from 'firebase/database';
import { db } from './firebase';
import type { Nannie } from '../types/nanniesType';

export const getNannies = async (): Promise<Nannie[]> => {
    const snapshot = await get(ref(db, "/"));
    return snapshot.val();
};

