import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from "@/env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// データを取得する例
const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

// fetchDataを呼び出し
export default fetchData;
