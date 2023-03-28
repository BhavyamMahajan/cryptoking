import axios from "axios";
import styles from "./page.module.css";
import millify from "millify";
import Link from "next/link";
import CryptoCard from "@/components/crypto-card/CryptoCard";
import { CoinDetail } from "@/types/card";
import NewsCard from "@/components/news-card/NewsCard";

export const revalidate = 0;

const getData = async () => {
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

const getNews = async () => {
  const newsData = await axios({
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=10`,
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  });
  return newsData.data as any;
};

export default async function Home() {
  const cryptoData = await getData();
  const newsData = await getNews();
  console.log(newsData);
  return (
    <div className={styles.main}>
      <div className={styles.rows}>
        <h2>Global Crypto Stats</h2>
        <div className={styles.stats}>
          <div className={styles.stats_row}>
            <p className={styles.title}>Total Cryptocurrencies</p>
            <p className={styles.value}>
              {millify(cryptoData.data.stats.totalCoins)}
            </p>
          </div>
          <div className={styles.stats_row}>
            <p className={styles.title}>Total Exchanges</p>
            <p className={styles.value}>
              {millify(cryptoData.data.stats.totalExchanges)}
            </p>
          </div>
          <div className={styles.stats_row}>
            <p className={styles.title}>Total Market Cap</p>
            <p className={styles.value}>
              {millify(cryptoData.data.stats.totalMarketCap)}
            </p>
          </div>
          <div className={styles.stats_row}>
            <p className={styles.title}>Total 24h Volume</p>
            <p className={styles.value}>
              {millify(cryptoData.data.stats.total24hVolume)}
            </p>
          </div>
          <div className={styles.stats_row}>
            <p className={styles.title}>Total Markets</p>
            <p className={styles.value}>
              {millify(cryptoData.data.stats.totalMarkets)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.curr_heading}>
          <h2>Top 10 Cryptocurrencies in the world</h2>
          <Link href="/cryptocurrencies">Show More</Link>
        </div>
        <div className={styles.ten_cards}>
          {cryptoData.data.coins.map(
            (ele: CoinDetail, index: any) =>
              index < 10 && <CryptoCard data={ele} />
          )}
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.curr_heading}>
          <h2>Latest Crypto News</h2>
          <Link href="/news">Show More</Link>
        </div>
        <div>
          {newsData.value.map((ele: any) => (
            <NewsCard data={ele} />
          ))}
        </div>
      </div>
    </div>
  );
}
