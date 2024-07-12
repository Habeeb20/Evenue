import { useEffect, useState } from "react";
import styles from "./styles/glamoreAdW1V.module.css";
import { Link } from "react-router-dom";
import { baseURL } from "../../lib/global/urls";

export interface Welcome67 {
  results: Result[];
}

export interface Result {
  id: number;
  img: string;
  url: string;
}

export const GlamoreAd = () => {
  const [imgs, setImgs] = useState<Welcome67>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseURL}/admin/getAdverts`);
      const data = await res.json();
      setImgs(data);
    })();
  }, []);

  const imgsList = imgs?.results.map((img) => (
    <div>
      <img src={img.img} alt="party" />
      <Link to={img.url}>View</Link>
    </div>
  ));
  return <div className={styles.containerW1V}>{imgsList}</div>;
};
