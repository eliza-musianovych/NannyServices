import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { 
  auth,
  db 
} from "./firebase";
import { 
  ref,
  set 
} from "firebase/database";

export const registerUser = async (username: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, {displayName: username});


  await set(ref(db, `users/${user.uid}`), {
    uid: user.uid,
    email: user.email,
    username,
    createdAt: new Date().toISOString(),
  });
  
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const observeUser = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};