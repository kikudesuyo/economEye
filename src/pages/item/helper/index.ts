import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from "@/env";

const app = initializeApp({
  projectId: PROJECT_ID,
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
});

const functions = getFunctions(app);

const itemPrice = httpsCallable(functions, "itemPrice");

export default itemPrice;
