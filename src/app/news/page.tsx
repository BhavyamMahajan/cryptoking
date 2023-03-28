import axios from "axios";

export const revalidate = 0;

const getData = async (newsCategory: string, count: string) => {
  const newsData = await axios({
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    params: { safeSearch: "Off", textFormat: "Raw" },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  });
  return newsData.data as any;
};

export default async function page({
  newsCategory,
  count,
}: {
  newsCategory: string;
  count: string;
}) {
  const newsData = await getData(newsCategory, count);
  console.log(newsData);

  return <div>news page</div>;
}
