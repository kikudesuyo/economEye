import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocRef } from "@/firebase/firestore/dbManage";

const fetchUserId = () => {
  const auth = getAuth();
  return new Promise<string>((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject("No user is signed in");
      }
    });
  });
};

export const getUserDocRef = async () => {
  const userId = await fetchUserId();
  return getDocRef("users", userId);
};
