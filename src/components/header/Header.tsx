"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import news from "public/icons/news.svg";
import graph from "public/icons/charts.svg";
import exc from "public/icons/exchange.svg";
import homeIcon from "public/icons/home.svg";
import logo from "public/assets/brand/cryptocurrency.png";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
const path = usePathname();

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="CryptoKing"
          className={styles.logoImg}
          style={{ width: "15%", height: "auto", objectFit: "contain" }}
        />
        <h2>CryptoKing</h2>
      </div>
      <div className={styles.nav_items}>
        <div className={path === '/' ?styles.nav_item_active: ""}>
          <Image
            src={homeIcon}
            alt="home"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/"> Home</Link>
        </div>
        <div className={path === '/cryptocurrencies' ?styles.nav_item_active: ""}>
          <Image
            src={graph}
            alt="charts"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/cryptocurrencies">Cryptocurrencies</Link>
        </div>
        <div className={path === '/exchanges' ?styles.nav_item_active: ""}>
          <Image
            src={exc}
            alt="exchange"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/exchanges">Exchanges</Link>
        </div>
        <div className={path === '/news' ?styles.nav_item_active: ""}>
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
