import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserItemData, ItemData, ItemPriceValue } from "@/utils/helper/type";
import { db } from "@/firebase/init";

export const fetchUserId = () => {
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

const fetchUserItemIds = async () => {
  try {
    const userId = await fetchUserId();
    const itemsSnap = await getDoc(doc(db, "users", userId));
    if (itemsSnap.exists()) {
      return itemsSnap.data().itemIds;
    }
  } catch (error) {
    console.error("Error getting documents", error);
    throw new Error("cannot fetch userItemIds");
  }
};

export const fetchUserItems = async (): Promise<UserItemData[]> => {
  try {
    const userItemIds = await fetchUserItemIds();
    const itemsRef = collection(db, "items");
    const itemQuery = query(itemsRef, where("__name__", "in", userItemIds));
    const itemSnapshot = await getDocs(itemQuery);
    const userItems: UserItemData[] = itemSnapshot.docs.map((doc) => {
      const data = doc.data() as ItemData;
      return {
        itemId: doc.id,
        ...data,
      };
    });
    return userItems;
  } catch (error) {
    console.error("Error getting items", error);
    throw error;
  }
};

export const getValueForDate = (itemData: ItemData, targetDate: string) => {
  const prices = itemData.prices;
  for (const price of prices) {
    if (price.date === targetDate) {
      return price.value;
    }
  }
  return null;
};

interface PriceEntry {
  date: string;
  value: ItemPriceValue;
}

export const getPriceArray = (itemData: ItemData): ItemPriceValue[] => {
  const prices = itemData.prices;
  const sortByDate = (a: PriceEntry, b: PriceEntry): number => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  };
  prices.sort(sortByDate);
  let values: ItemPriceValue[] = prices.map((entry) => entry.value);
  return values;
};
