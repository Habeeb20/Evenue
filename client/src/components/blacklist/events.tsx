import LimitedInfoCard from "../global/limitedInfoCard";
import { useEffect, useState } from "react";
import { Response } from "../../typesAndInterfaces/events/getLimitedInfo";
import styles from "../venue/styles/weddingVenuesDE7.module.css";
// import { Link } from "react-router-dom";
import { ErrMsg } from "../global/errMsg";
import getLimitedInfoFn from "../../lib/events/getLimitedInfo";

export const BlacklistEvents = () => {
  const [events, setEvents] = useState<Response>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLimitedInfoFn({ blacklistIdentifier: "blacklistIdentifier", setErrMsg })
      .then((res) => {
        setEvents(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = events?.result.map((event) => (
    <LimitedInfoCard
      key={event.event_id}
      {...event}
    />
  ));

  // problem of correct key attr here
  //   const total = venues?.finalResult[1].map((total, index) => (
  //     <span key={index}>{total.total}</span>
  //   ));

  return (
    <div
      className={styles.containerDE7}
      style={{ padding: "2rem" }}
    >
      <div className={styles.header}>
        <h1>Blacklisted Events</h1>
        {/* {content && content.length > 6 && (
          <Link to={``}>View All ({total})</Link>
        )}{" "} */}
        {/* placeholder to attribute */}
      </div>
      {errMsg ? (
        <>
          <ErrMsg errMsg={errMsg} />
        </>
      ) : (
        <div className={styles.contentAreaDE7}>{content}</div>
      )}
    </div>
  );
};
