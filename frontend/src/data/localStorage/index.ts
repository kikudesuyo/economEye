import { ItemData } from "@/utils/types/items";

export const saveLocalStrage = (key: string, value: ItemData[]) => {
  const itemData = JSON.stringify(value);
  const storage = localStorage;
  storage.setItem(key, itemData);
};

export const getLocalStrage = (key: string) => {
  const storage = localStorage;
  const itemData = storage.getItem(key);
  if (itemData === null) {
    return [];
  }
  return JSON.parse(itemData);
};
