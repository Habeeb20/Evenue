import { useEffect, useState } from "react";
import { Res4CountBycat } from "../../typesAndInterfaces/events/res4CountByCat";
import getCountByCatFn from "../../lib/events/getCountByCat";
import { Link } from "react-router-dom";
import styles from "./styles/eventsByCat29C.module.css";

export const EventsByCat = () => {
  const [res4EventsByCat, setRes4EventsByCat] = useState<Res4CountBycat>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      getCountByCatFn({ setErrMsg }).then((res) => {
        res && setRes4EventsByCat(res);
      });
    } catch (error) {}
  }, []);

  // content
  const totalTraining = res4EventsByCat?.result.find(
    (event) => event.total_training
  )?.total_training;
  const totalCooperation = res4EventsByCat?.result.find(
    (event) => event.total_cooperation
  )?.total_cooperation;
  const total_meetings = res4EventsByCat?.result.find(
    (event) => event.total_meetings
  )?.total_meetings;
  const totalEngagement = res4EventsByCat?.result.find(
    (event) => event.total_engagement
  )?.total_engagement;
  const totalParty = res4EventsByCat?.result.find(
    (event) => event.total_party
  )?.total_party;

  return (
    <div className={styles.container29C}>
      <Link to={`/events/q/training`}>
        <div>
          <h3>Training</h3>
          <p>{totalTraining} events</p>
        </div>
      </Link>
      <Link to={`/events/q/cooperation`}>
        <div>
          <h3>Cooperation</h3>
          <p>{totalCooperation} events</p>
        </div>
      </Link>
      <Link to={`/events/q/meetings`}>
        <div>
          <h3>Meetings</h3>
          <p>{total_meetings} events</p>
        </div>
      </Link>
      <Link to={`/events/q/engagement`}>
        <div>
          <h3>Engagements</h3>
          <p>{totalEngagement} events</p>
        </div>
      </Link>
      <Link to={`/events/q/party`}>
        <div>
          <h3>Parties</h3>
          <p>{totalParty} events</p>
        </div>
      </Link>
    </div>
  );
};
