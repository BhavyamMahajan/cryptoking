import Image from "next/image";
import styles from "./header.module.css";
import logo from "public/assets/brand/cryptocurrency.png";
import homeIcon from "public/icons/home.svg";
import graph from "public/icons/charts.svg";
import exc from "public/icons/exchange.svg";
import news from "public/icons/news.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="CryptoKing"
          style={{ width: "15%", height: "auto", objectFit: "contain" }}
        />
        <h2>CryptoKing</h2>
      </div>
      <div className={styles.nav_items}>
        <div>
          <Image
            src={homeIcon}
            alt="home"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/"> Home</Link>
        </div>
        <div>
          <Image
            src={graph}
            alt="charts"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/cryptocurrencies">Cryptocurrencies</Link>
        </div>
        <div>
          <Image
            src={exc}
            alt="exchange"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/exchanges">Exchanges</Link>
        </div>
        <div>
          <Image
            src={news}
            alt="news"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/news">News</Link>
        </div>
      </div>
    </div>
  );
}
