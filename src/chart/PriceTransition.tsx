import ItemChart from "@/chart/ItemChart";
import { PriceFormatter } from "@/chart/formatprices";
import { formatAverage } from "@/pages/item/calcValue";
import { ChartDataset } from "@/utils/types/ui";
import { UserItemData } from "@/utils/types/items";
import { formatDate } from "@/utils/timeUtils";

type Props = {
  item: UserItemData;
};

const PriceTransition = ({ item }: Props) => {
  const prices = new PriceFormatter(item.prices);
  const values = prices.values();
  const dates = prices.dates();

  const xLabels = dates.map((date) => formatDate(date));
  const datasets: ChartDataset[] = [
    {
      type: "line",
      label: "平均",
      data: Array(values.length).fill(formatAverage(values)),
      borderColor: "rgba(119, 119, 119, 1)",
      borderDash: [5, 5],
      tension: 0.1,
      pointRadius: 0,
    },
    {
      type: "bar",
      label: "料金",
      data: values,
      backgroundColor: "rgba(32, 178, 170, 1)",
      tension: 0.1,
      pointRadius: 2,
    },
  ];
  return <ItemChart xLabels={xLabels} datasets={datasets} />;
};

export default PriceTransition;
