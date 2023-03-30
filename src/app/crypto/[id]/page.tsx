"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import dollar from "public/icons/pricetousd.svg";
import rank from "public/icons/rank.svg";
import volume from "public/icons/vol.svg";
import millify from "millify";
import Image from "next/image";
import markets from "public/icons/charts.svg";
import exc from "public/icons/exchange.svg";

export const revalidate = 0;
const getData = async (id: string) => {
  const coin = await axios({
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },

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
  const [tiimePeriod, setTimePeriod] = useState<string>();
  const time = ["3h", "24h", "7d", "3m", "30d", "1y", "3y", "5y"];
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
      value: `$ ${millify(coinDetail?.supply.total)}`,
      icon: exc,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(coinDetail?.supply.circulating)}`,
      icon: exc,
    },
  ];

  useEffect(() => {
    console.log("first+ " + id);
    async function callApi() {
      const coinDetail = await getData(id);
      setCoinDetail(coinDetail.data.coin);
    }
    callApi();
  }, []);
  console.log(coinDetail);
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
                <p>{ele.title === "Rank" ? ele.value : `$${ele.value}`}</p>
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
                <p>{ele.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
