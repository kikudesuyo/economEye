import { useEffect, useRef } from "react";
import { Chart, registerables, ChartData } from "chart.js";

Chart.register(...registerables);

export type Props = {
  xLabels: string[];
  datasets: ChartData["datasets"];
};

const ItemChart = ({ xLabels, datasets }: Props) => {
  const chartRef = useRef<Chart | null>(null);
  const chartCanvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const context = chartCanvas.current?.getContext("2d");
    if (context) {
      chartRef.current = new Chart(context, {
        type: "line",
        data: {
          labels: xLabels,
          datasets: datasets,
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          responsive: true,
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [xLabels, datasets]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-2/3">
        <canvas ref={chartCanvas}></canvas>
      </div>
    </div>
  );
};

export default ItemChart;
