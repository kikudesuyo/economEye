import { ItemPriceValue } from "@/utils/types/items";

type ChartType = "line" | "bar";

export type ChartDataset = {
  type: ChartType;
  label: string;
  data: ItemPriceValue[];
  borderColor?: string;
  backgroundColor?: string;
  borderDash?: number[];
  tension: number;
  pointRadius: number;
};
