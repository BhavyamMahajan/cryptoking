import { CoinGraph } from "@/types/card";
import { Line } from "react-chartjs-2";
import styles from "./styles.module.css";
import {Chart,LinearScale,CategoryScale,PointElement,LineElement,Legend,Tooltip} from "chart.js";
Chart.register(
CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip
    )

export default function Graph({
  coinHistory,
  currentPrice,
  coinName,
}: CoinGraph) {

  const coinPrice = [String];
  const coinTimest: string[] = [];

  coinHistory?.data?.history?.map((ele: any) => {
    coinPrice.push(ele.price);
    coinTimest.push(new Date(ele.timestamp).toLocaleDateString());
  });

  const data = {
    labels: coinTimest,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options:any = {
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  console.log(coinTimest)
  return (
    <>
    <div className={styles.graph_heading}>
      <p className={`${styles.stats_head} ${styles.color_blue}`}>
        {coinName} Price Chart
      </p>
      <div className={styles.graph_row}>
        <p>{coinHistory?.data?.change}%</p>
        <p>
          Current {coinName} Price: ${parseFloat(currentPrice).toFixed(2)}
        </p>
      </div>
    </div>
    <Line data={data} options={options}/>
    </>

  );
}
