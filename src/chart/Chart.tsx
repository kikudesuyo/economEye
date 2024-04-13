import { GraphProps } from "@/utils/types/ui";
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
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";

const CompositeChart = ({ titleName, xLabels, datasets }: GraphProps) => {
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
      <Chart type={"line"} data={data} options={options} />
    </div>
  );
};

export default CompositeChart;
