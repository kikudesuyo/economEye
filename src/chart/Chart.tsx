import { GraphProps } from "@/utils/type";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";

const CompositeChart = ({ titleName, xLabels, datasets }: GraphProps) => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title
  );

  const data: ChartData = {
    datasets: datasets,
    labels: xLabels,
  };

  const options: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: titleName,
      },
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
  };

  return (
    <div>
      <Chart type={"bar"} data={data} options={options} />
    </div>
  );
};

export default CompositeChart;
