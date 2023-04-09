"use client";
import NewsCard from "@/components/news-card/NewsCard";
import axios from "axios";
import styles from "./styles.module.css";
import { CoinDetail } from "@/types/card";
import { useEffect, useState } from "react";
export const revalidate = 0;

const getData = async (newsCategory: string) => {
  const newsData = await axios({
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=100`,
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  });
  return newsData.data as any;
};

const getCoins = async () => {
  const coin = await axios({
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
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

export default function Page() {
  const [newsData, setNewsData] = useState<any>();
  const [coins, setCoins] = useState<any>();
  const [newsCategory, setNewsCategory] = useState<string>("Cyrptocurrency");

  useEffect(() => {
    async function callApi() {
      const newsData = await getData(newsCategory);
      const coins = await getCoins();
      setNewsData(newsData);
      setCoins(coins);
    }
    callApi();
  }, [newsCategory]);

  return (
    <div className={styles.main}>
      <select
        className={styles.drop_down}
        defaultValue="Select a crypto"
        onChange={(e) => setNewsCategory(e.target.value)}
      >
        <option value="Select a crypto" disabled>
          Select a crypto
        </option>
        <option value="Cryptocurrency">Cryptocurrency</option>
        {coins?.data.coins.map((ele: CoinDetail) => (
          <option key={ele.rank} value={ele.name}>
            {ele.name}
          </option>
        ))}
      </select>
      <div className={styles.cards}>
        {newsData?.value.map((ele: any, id: number) => (
          <NewsCard key={id} data={ele} />
        ))}
      </div>
    </div>
  );
}
