import { GraphDataset } from "@/utils/type";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  PointElement,
  Legend,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

export type Props = {
  xLabels: string[];
  datasets: GraphDataset[];
};

const ItemChart = ({ xLabels, datasets }: Props) => {
  ChartJS.register(
    LineController,
    LineElement,
    LinearScale,
    CategoryScale,
    BarController,
    BarElement,
    PointElement,
    RadialLinearScale,
    Legend,
    Tooltip
  );

  const data: ChartData = {
    datasets: datasets,
    labels: xLabels,
  };

  const options: ChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-2/3">
        <Chart type={"line"} data={data} options={options} width={300} />
      </div>
    </div>
  );
};

export default ItemChart;
