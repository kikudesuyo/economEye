import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {db} from "@/firestore/init";

export const authenticate = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { itemId: [] });
    await login(email, password);
    return await Promise.resolve();
  } catch (error: any) {
    throw new Error(error.code + error.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    return Promise.resolve();
  } catch (error: any) {
    throw new Error(error.code + error.message);
  }
};

export const isValidEmail = (email: string) => {
  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return pattern.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 6;
};
