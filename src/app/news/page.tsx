import NewsCard from "@/components/news-card/NewsCard";
import axios from "axios";
import styles from "./styles.module.css";
export const revalidate = 0;

const getData = async () => {
  const newsData = await axios({
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=100`,
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  });
  return newsData.data as any;
};

export default async function page()
 {
  const newsData = await getData();

  return (
  <div className={styles.main}>
  {
    newsData.value.map((ele:any,id:number)=><NewsCard key={id} data={ele}/>)
  }
  </div>);
}
