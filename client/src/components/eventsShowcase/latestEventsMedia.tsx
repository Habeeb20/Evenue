import LimitedInfoCard from "./limitedInfoCard";
import { useEffect, useState } from "react";
import styles from "./styles/latestEventsMediaCZ2.module.css";
import { Link } from "react-router-dom";
import { ErrMsg } from "../global/errMsg";
import getLimitedInfoForAllFn from "../../lib/eventsShowcase/getAllLimitedInfo";
import { EventShowcaseResponse } from "../../typesAndInterfaces/eventShowcase/getAllLimitedInfo";

export const LatestEventsMedia = () => {
  const [events, setEvents] = useState<EventShowcaseResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLimitedInfoForAllFn({ setErrMsg })
      .then((res) => {
        setEvents(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = events?.finalResult[0].slice(0, 20).map((venue) => (
    <LimitedInfoCard
      key={venue.id}
      {...venue}
    />
  ));

  // problem of correct key attr here
  const total = events?.finalResult[1].map((total, index) => (
    <span key={index}>{total.total}</span>
  ));

  return (
    <div className={styles.containerCZ2}>
      <div className={styles.header}>
        <h1>Latest Events Media</h1>
        {content && content.length > 20 && (
          <Link to={``}>View All ({total})</Link>
        )}{" "}
        {/* placeholder to attribute */}
      </div>
      {errMsg ? (
        <>
          <ErrMsg errMsg={errMsg} />
        </>
      ) : (
        <div className={styles.contentArea}>{content}</div>
      )}
    </div>
  );
};
