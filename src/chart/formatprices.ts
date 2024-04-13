import { ItemPriceValue, Prices } from "@/utils/types/items";

export class PriceFormatter {
  prices: Prices;

  constructor(prices: Prices) {
    this.prices = prices;
  }

  dates(): string[] {
    return this.prices.map((price) => price.date);
  }

  values(): ItemPriceValue[] {
    return this.prices.map((price) => price.value);
  }
}
