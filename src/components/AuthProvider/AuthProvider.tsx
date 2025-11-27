import { 
    useState,
    useEffect
 } from "react";
import { AuthContext } from "../../context/AuthContext";
import { 
    onAuthStateChanged, 
    type User 
} from "firebase/auth";
import { auth } from "../../services/firebase";

export default function AuthProvider ({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};
