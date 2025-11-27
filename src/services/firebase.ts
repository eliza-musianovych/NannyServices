import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDoawMmaqUKjgQ0npu_Vw0THevH23eD4SI",
  authDomain: "nanny-services-4b2d6.firebaseapp.com",
  projectId: "nanny-services-4b2d6",
  storageBucket: "nanny-services-4b2d6.firebasestorage.app",
  messagingSenderId: "957164522021",
  appId: "1:957164522021:web:dfafda77835189bb3d0dcc",
  measurementId: "G-TD2L6WPEY9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);