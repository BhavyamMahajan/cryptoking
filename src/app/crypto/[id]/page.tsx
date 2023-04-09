"use client";
import axios from "axios";
import Link from "next/link";
import millify from "millify";
import Image from "next/image";
import styles from "./styles.module.css";
import rank from "public/assets/icons/rank.svg";
import volume from "public/assets/icons/vol.svg";
import { useEffect, useState } from "react";
import exc from "public/assets/icons/exchange.svg";
import markets from "public/assets/icons/charts.svg";
import dollar from "public/assets/icons/pricetousd.svg";
import Graph from "./Graph";

export const revalidate = 0;
const getData = async (id: string) => {
  const coin = await axios({
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
    headers: {
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  });
  return coin.data as any;
};

const getHistory = async ({
  id,
  timePeriod,
}: {
  id: string;
  timePeriod: string;
}) => {
  const coin = await axios({
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
    params: { timePeriod: timePeriod },
    headers: {
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  });
  return coin.data as any;
};

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [coinDetail, setCoinDetail] = useState<any>();
  const [timePeriod, setTimePeriod] = useState<string>("7d");
  const [coinHistory, setCoinHistory] = useState<any>();
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `${parseFloat(coinDetail?.price).toFixed(2)}`,
      icon: dollar,
    },
    { title: "Rank", value: `${coinDetail?.rank}`, icon: rank },
    {
      title: "24h Volume",
      value: `${coinDetail && millify(coinDetail["24hVolume"])}`,
      icon: volume,
    },
    {
      title: "Market Cap",
      value: `${millify(coinDetail?.marketCap)}`,
      icon: dollar,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${millify(coinDetail?.allTimeHigh.price)}`,
      icon: volume,
    },
  ];
  const stats2 = [
    {
      title: "Number of Markets",
      value: coinDetail?.numberOfMarkets,
      icon: markets,
    },
    {
      title: "Number of Exchanges",
      value: coinDetail?.numberOfExchanges,
      icon: exc,
    },
    {
      title: "Approved Supply",
      value: `${coinDetail?.supply.confirmed ? "Yes" : "No"}`,
      icon: exc,
    },
    {
      title: "Total Supply",
      value: `$${millify(coinDetail?.supply.total)}`,
      icon: exc,
    },
    {
      title: "Circulating Supply",
      value: `$${millify(coinDetail?.supply.circulating)}`,
      icon: exc,
    },
  ];

  useEffect(() => {
    async function callApi() {
      const coinDetail = await getData(id);
      const coinHistory = await getHistory({ id, timePeriod });
      setCoinDetail(coinDetail.data.coin);
      setCoinHistory(coinHistory);
    }
    callApi();
  }, [timePeriod]);

  return (
    <div className={styles.main}>
      <div className={styles.page_head}>
        <h2>{coinDetail?.name} Price</h2>
        <p>
          {coinDetail?.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </div>

      <select
        className={styles.drop_down}
        defaultValue="7d"
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        {time.map((ele, id) => (
          <option key={id} value={ele}>
            {ele}
          </option>
        ))}
      </select>
      <Graph
        coinHistory={coinHistory}
        currentPrice={coinDetail?.price}
        coinName={coinDetail?.name}
      />
      <div className={styles.stats_container}>
        <div className={styles.stats}>
          <p className={styles.stats_head}>
            {coinDetail?.name} Value Statistics
          </p>
          <p>An overview showing the stats of {coinDetail?.name}</p>
          <div className={styles.stats_table}>
            {stats.map((ele, id) => (
              <div key={"st" + id} className={styles.stats_row}>
                <div className={styles.icon_title}>
                  <Image
                    src={ele.icon}
                    alt={ele.title}
                    width={20}
                    height={20}
                  />
                  <p>{ele.title}</p>
                </div>
                <p className={styles.text_bold}>
                  {ele.title === "Rank" ? ele.value : `$${ele.value}`}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.stats}>
          <p className={styles.stats_head}>Other Statistics</p>
          <p>An overview showing the stats of all cryptocurrencies</p>
          <div className={styles.stats_table}>
            {stats2.map((ele, id) => (
              <div key={"ot" + id} className={styles.stats_row}>
                <div className={styles.icon_title}>
                  <Image
                    src={ele.icon}
                    alt={ele.title}
                    width={20}
                    height={20}
                  />
                  <p>{ele.title}</p>
                </div>
                <p className={styles.text_bold}>{ele.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        <p className={styles.stats_head}>{coinDetail?.name} Links</p>
        <div>
          {coinDetail?.links.map((ele: any, id: number) => (
            <div key={id} className={`${styles.stats_row} ${styles.coinLinks}`}>
              <p>{ele.type}</p>
              <Link href={ele.url} target="_blank">
                {ele.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
