import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from "@/env";
import { ItemParams } from "@/utils/helper/type";

const app = initializeApp({
  projectId: PROJECT_ID,
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
});

const functions = getFunctions(app);

const itemPrice = (janCode: string) => {
  const addItemPrice = httpsCallable(functions, "addItemPrice");
  const params: ItemParams = {
    janCode: janCode,
    condition: "new",
  };
  addItemPrice(params).then((result) => {
    console.log(result.data);
  });
};

// const itemPrice = httpsCallable(functions, "addItemPrice");

export default itemPrice;
