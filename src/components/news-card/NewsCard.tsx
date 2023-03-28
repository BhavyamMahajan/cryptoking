import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import moment from "moment";

export default function NewsCard({ data }: { data: any }) {
  const demoImg =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  return (
    <Link href={data.url} target="_blank" className={styles.news_card}>
      <div className={styles.news_card_head}>
        <p>{data.name}</p>
        <Image
          src={data.image?.thumbnail.contentUrl || demoImg}
          alt="news Image"
          width={100}
          height={100}
        />
      </div>
      <p>
        {data.description.length > 100
          ? `${data.description.substring(0, 100)}...`
          : data.description}
          
      </p>
      <div className={styles.news_card_footer}>
        <div className={styles.news_provider}>

        {data.provider[0]?.image?.thumbnail.contentUrl && (
          <Image
          src={data.provider[0].image.thumbnail.contentUrl}
          alt="logo"
          width={30}
          height={30}
          style={{borderRadius:"100%"}}
          />
          )}
        <p>{data.provider[0].name}</p>
          </div>
        <p>{moment(data.datePublished).startOf("seconds").fromNow()}</p>
      </div>
    </Link>
  );
}
