import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { itemRefs: [] });
    await this.login(email, password);
    return await Promise.resolve();
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
    return Promise.resolve();
  }

  async logout() {
    await signOut(this.auth);
    return Promise.resolve();
  }
  //匿名認証
  // async anonymousLogin() {
  //   await signInAnonymously(this.auth);
  //   return Promise.resolve();
  // }
}

export const isValidEmail = (email: string) => {
  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return pattern.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 6;
};
