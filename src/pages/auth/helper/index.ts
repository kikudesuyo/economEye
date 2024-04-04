import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Auth as FirebaseAuth } from "firebase/auth";
import { db } from "@/firebase/init";

export class Auth {
  auth: FirebaseAuth;
  constructor() {
    this.auth = getAuth();
  }

  async signup(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, { itemIds: [] });
      await this.login(email, password);
      return await Promise.resolve();
    } catch (error: any) {
      throw new Error(error.code + error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return Promise.resolve();
    } catch (error: any) {
      throw new Error(error.code + error.message);
    }
  }
}

export const isValidEmail = (email: string) => {
  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return pattern.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 6;
};
