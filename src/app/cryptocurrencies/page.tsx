import CryptoCard from "@/components/crypto-card/CryptoCard";
import { CoinDetail } from "@/types/card";
import axios from "axios";
import styles from "./styles.module.css";

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
      limit: "200",
      offset: "0",
    },

    headers: {
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  });
  return coin.data as any;
};

export default async function Page() {
  const coins = await getData();

  return (
    <div className={styles.crypto_page}>
      {coins.data.coins.map((ele: CoinDetail) => (
        <CryptoCard data={ele} />
      ))}
    </div>
  );
}
