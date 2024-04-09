import LineGraph from "@/graphs/LineGraph";
import { PriceFormatter } from "@/graphs/formatprices";
import { formattedAverage } from "@/calculation/calcValue";
import { UserItemData, GraphDataset } from "@/utils/type";
import { formatDate } from "@/utils/timeUtils";
type Props = {
  item: UserItemData;
};

const PriceTransition = ({ item }: Props) => {
  const prices = new PriceFormatter(item.prices);
  const values = prices.values();
  const dates = prices.dates();
  const xLabels = dates.map((date) => formatDate(date));
  const datasets: GraphDataset[] = [
    {
      label: "値段推移",
      data: values,
      borderColor: "blue",
      tension: 0.1,
      pointRadius: 2,
    },
    {
      label: "平均",
      data: Array(values.length).fill(formattedAverage(values)),
      borderColor: "rgba(115, 115, 115, 1)",
      borderDash: [5, 5],
      tension: 0.1,
      pointRadius: 0,
    },
  ];
  return <LineGraph datasets={datasets} xLabels={xLabels} />;
};

export default PriceTransition;
