import { ItemData, ItemPriceValue } from "@/utils/type";

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
  const values: ItemPriceValue[] = prices.map((entry) => entry.value);
  return values;
};
