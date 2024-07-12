import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getLimitedInfoByAdminFn from "../../lib/events/getLimitedInfoByAdmin";
import { Response } from "../../typesAndInterfaces/events/getLimitedInfo";
import LimitedInfoCard from "../global/limitedInfoCard";
import styles from "../home/styles/upcomingLL2.module.css";

export const ViewByAdminEventCategory = () => {
  const { category_identifier } = useParams();

  if (!category_identifier) {
    throw new Error("pass category view");
  }
  // capitalize title
  const title =
    category_identifier.charAt(0).toUpperCase() + category_identifier.slice(1);

  const [events, setEvents] = useState<Response>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLimitedInfoByAdminFn({ category: category_identifier, setErrMsg })
      .then((res) => {
        setEvents(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = events?.result
    .slice(0, 6)
    .map((event) => <LimitedInfoCard key={event.event_id} {...event} />);

  return (
    <div className={styles.upcomingLL2}>
      <h1>
        Upcoming Events in <span>Lagos</span>
      </h1>
      {errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>{content}</div>
      )}
    </div>
  );
};
