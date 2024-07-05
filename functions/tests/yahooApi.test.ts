import YahooItem from "../src/item/yahooItem";
import { describe, expect, it } from "@jest/globals";

describe("ピュレグミ", () => {
  it("fetchCheapestItem", async () => {
    const yahooItem = new YahooItem({
      janCode: "4901351058633",
    });
    const item = await yahooItem.fetchCheapestItem();
    expect(item).toHaveProperty("image.medium");
    expect(item).toHaveProperty("url");
    expect(item).toHaveProperty("price");
  });
});

describe("マウンテンデュー", () => {
  it("fetchCheapestItem", async () => {
    const yahooItem = new YahooItem({
      janCode: "4901777045682",
    });
    const item = await yahooItem.fetchCheapestItem();
    expect(item).toHaveProperty("image.medium");
    expect(item).toHaveProperty("url");
    expect(item).toHaveProperty("price");
  });
});
