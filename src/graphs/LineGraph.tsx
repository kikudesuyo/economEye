import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GraphProps } from "@/utils/type";

const LineGraph = ({ datasets, xLabels }: GraphProps) => {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);
  const chartData: ChartData<"line"> = {
    labels: xLabels,
    datasets: datasets,
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
          maxTicksLimit: 4,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { boxHeight: 10 },
      },
    },
  };

  return (
    <div className="flex justify-center">
      <div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
