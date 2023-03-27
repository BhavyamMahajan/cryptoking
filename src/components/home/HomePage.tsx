"use client";
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
      limit: "50",
      offset: "0",
    },

    headers: {
      "X-RapidAPI-Key": "568cc82003msh93b8dcaea65891bp133b39jsn1c6b116a2bb6",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  });
  return coin.data;
};

export default async function HomePage() {
  const coin = await getData();

  return (
    <div className={styles.main}>
      {JSON.stringify(coin)}
      <p>Home</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis fugiat
        odit quam, cum ad eos, dolorem delectus in sed dolorum architecto
        accusamus ab ullam tenetur incidunt quaerat id necessitatibus error.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ut
        natus optio itaque! Similique, nulla, eum cupiditate natus et, fugit
        quaerat praesentium aliquid quo quidem dolores repellendus laudantium
        sed recusandae asperiores eveniet qui reiciendis. Libero error odio
        voluptatem ab nulla enim consectetur adipisci sit, excepturi
        voluptatibus quis obcaecati quam eaque nemo mollitia accusamus soluta
        saepe maiores vel fugit praesentium quia asperiores aliquid. Rerum sit
        magnam atque reprehenderit exercitationem, voluptate consectetur iste
        corrupti recusandae, dolore incidunt magni minus! Ea eum iste eaque
        aliquid nesciunt dolor quas molestias dolore labore, officiis expedita
        placeat cupiditate deleniti magni repellendus quibusdam alias sint odio
        accusantium vel doloribus. Commodi doloremque inventore voluptas
        voluptate fugiat eius voluptates harum sit officiis eligendi at soluta
        sed similique in, aspernatur cupiditate libero totam quaerat, sunt
        nihil. Deleniti sed dolorem vero dicta ullam modi ipsam rem sapiente,
        quam ad optio veritatis minus at. Reprehenderit laudantium ipsum nihil
        accusamus enim fuga vero ipsam vel voluptatum iusto eius, odit dolor
        ducimus error fugit sapiente doloremque veniam accusantium
        necessitatibus ab beatae quisquam labore! Ducimus, obcaecati beatae!
        Fugit consequuntur quam error! Delectus, dolore, nostrum pariatur
        explicabo eius dicta voluptates ut aliquid tempora veniam, ullam
        quibusdam unde fuga! Accusantium labore perferendis, necessitatibus
        magni et neque! Fugiat consectetur dolores repellat, est nisi non et
        beatae reprehenderit odio alias temporibus, facilis inventore illo
        consequuntur dicta in aliquam aperiam ducimus natus sed saepe, obcaecati
        quidem. Omnis, nulla porro possimus quidem suscipit, aut iste nostrum
        ipsum eius quos qui expedita repellendus minima consectetur atque rerum
        accusamus voluptates eum error facilis molestiae quo temporibus et
        impedit? Magni commodi eaque ducimus expedita a molestiae, unde sed
        architecto consequatur tenetur hic soluta tempora iusto quae voluptates
        mollitia suscipit minima! Obcaecati deserunt adipisci, sit
        exercitationem quis earum, assumenda, minima voluptatum distinctio
        magnam cumque. In nemo tempore dolorum quia qui. Totam asperiores
        adipisci repellat, soluta magnam recusandae nihil assumenda molestias
        enim quod hic doloribus nam voluptate dignissimos vero beatae quam
        tenetur in voluptates illum? Sapiente neque hic accusamus? Dicta
        sapiente eum expedita harum, dolorum optio nisi cupiditate ipsum
        recusandae assumenda nesciunt perspiciatis iusto. Vero numquam ipsa
        beatae temporibus labore molestias voluptatibus tempora magni incidunt
        eos minus eaque suscipit doloremque repudiandae, odit pariatur maxime
        cupiditate distinctio cumque deleniti ducimus magnam eius amet vel?
        Praesentium voluptas enim veritatis quidem tempore dicta, repudiandae et
        reiciendis reprehenderit, vero earum cupiditate voluptates officiis
        delectus nostrum atque sunt. Ullam tempora dolore voluptate. Repudiandae
        exercitationem sint quod sapiente quasi? Atque sunt, vitae consectetur
        quis sed, alias recusandae facere asperiores voluptas soluta quibusdam
        voluptate quasi. Modi sapiente laborum dolores possimus aliquid hic
        explicabo praesentium mollitia sit porro, ipsa, officiis quaerat
        asperiores temporibus quod nesciunt quasi laboriosam obcaecati ratione
        aperiam. Repudiandae quam suscipit, iusto id aliquid cum maiores dolorem
        corporis quas possimus quos deleniti consequuntur soluta repellat
        repellendus, ipsum nemo aperiam quis? Minus sed vitae aliquam dolor
        numquam laborum molestias illum. Amet, cupiditate. Cum nihil, quos ad
        voluptas animi ullam repellendus, provident eaque recusandae harum
        quibusdam architecto hic eum! Ut voluptas, enim quia ducimus id sequi
        ullam sunt, veniam doloribus, ipsam fugit rem aspernatur!
      </p>
    </div>
  );
}
