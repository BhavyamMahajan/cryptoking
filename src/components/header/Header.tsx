"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import news from "public/assets/icons/news.svg";
import graph from "public/assets/icons/charts.svg";
import homeIcon from "public/assets/icons/home.svg";
import logo from "public/assets/brand/cryptocurrency.png";
import { usePathname } from "next/navigation";
import menu from "public/assets/icons/menu.svg";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  const node = useRef<HTMLImageElement>(null);
  const handleDomClick = (e: any) => {
    if (e.target.closest(".drop-down-head") !== node.current) setShow(false);
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("click", handleDomClick);
      return () => {
        document.removeEventListener("click", handleDomClick);
      };
    }
  });
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
        <div className={path === "/" ? styles.nav_item_active : ""}>
          <Image
            src={homeIcon}
            alt="home"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/"> Home</Link>
        </div>
        <div
          className={path === "/cryptocurrencies" ? styles.nav_item_active : ""}
        >
          <Image
            src={graph}
            alt="charts"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/cryptocurrencies">Cryptocurrencies</Link>
        </div>
        <div className={path === "/news" ? styles.nav_item_active : ""}>
          <Image
            src={news}
            alt="news"
            style={{ width: "10%", height: "auto" }}
            className={styles.icons}
          />
          <Link href="/news">News</Link>
        </div>
      </div>
      <Image
        src={menu}
        alt="menu"
        className={styles.mobile_menu}
        onClick={() => setShow(!show)}
        ref={node}
      />
      {show && (
        <div className={styles.menu_list}>
          <Link href="/">Home</Link>
          <Link href="/cryptocurrencies">Cryptocurrencies</Link>
          <Link href="/news">News</Link>
        </div>
      )}
    </div>
  );
}
