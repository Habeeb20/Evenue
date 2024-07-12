import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getLimitedInfoForAllFn from "../../lib/eventsServices/getLimitedInfoForAll";
import { GetLimitedInfoForAllResponse } from "../../typesAndInterfaces/eventServices/getLimitedInfoForAll";
import styles from "../home/styles/upcomingLL2.module.css";
import stylesCUS from "./styles/viewByEServiceCUS.module.css";
import LimitedInfoCard from "./limitedInfoCard";

export const ViewByEServiceCat = () => {
  const { category_identifier } = useParams();

  if (!category_identifier) {
    throw new Error("pass category view");
  }
  // capitalize title
  const title =
    category_identifier.charAt(0).toUpperCase() + category_identifier.slice(1);

  const [eventServices, setEventServices] =
    useState<GetLimitedInfoForAllResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLimitedInfoForAllFn({ category: category_identifier, setErrMsg })
      .then((res) => {
        setEventServices(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = eventServices?.result
    .slice(0, 15)
    .map((event) => <LimitedInfoCard key={event.id} {...event} />);

  return (
    <div className={styles.upcomingLL2}>
      <h1>{/*TODO: pass heading via props */}</h1>
      {errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <div className={stylesCUS.containerCUS}>{content}</div>
      )}
    </div>
  );
};
