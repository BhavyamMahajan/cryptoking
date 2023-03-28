import Image from "next/image";
import styles from "./styles.module.css";
import { CoinDetail } from "@/types/card";
import Link from "next/link";
import millify from "millify";

export default function CryptoCard({ data }: { data: CoinDetail }) {
  return (
    <Link href={`/crypto/${data.uuid}`} className={styles.card}>
      <div className={styles.card_head}>
        <p>{`${data.rank}. ${data.name}`}</p>
        <Image src={data.iconUrl} alt="kl" width={30} height={30} />
      </div>
      <div className={styles.card_desc}>
        <p>Price: {parseFloat(data.price).toFixed(2)} USD</p>
        <p>Market Cap: {millify(data.marketCap)}</p>
        <p>Daily Change: {millify(data.change)}%</p>
      </div>
    </Link>
  );
}
