import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from "@/env";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const functions = getFunctions(app);