import getLimitedInfoFn from "../../lib/events/getLimitedInfo";
import LimitedInfoCard from "../global/limitedInfoCard";
import { useEffect, useState } from "react";
import { Response } from "../../typesAndInterfaces/events/getLimitedInfo";
import { Slider } from "../global/slider";
import styles from "./styles/upcomingLL2.module.css";

export const Upcoming = () => {
  const [events, setEvents] = useState<Response>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLimitedInfoFn({ locationIdentifier: undefined, setErrMsg })
      .then((res) => {
        setEvents(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = events?.result.slice(0, 6).map((event) => (
    <LimitedInfoCard
      key={event.event_id}
      {...event}
    />
  ));

  return (
    <div className={styles.upcomingLL2}>
      <h1>
        Upcoming Events in <span>Lagos</span>
      </h1>
      {errMsg ? <p>{errMsg}</p> : <Slider content={content || []} />}
    </div>
  );
};
