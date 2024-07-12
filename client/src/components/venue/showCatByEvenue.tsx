import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAdminEventCatFn from "../../lib/events/getAdminEventCount";
import { Res4AdminEventCount } from "../../typesAndInterfaces/events/res4AdminCategory";
import styles from "../event/styles/eventsByCat29C.module.css";
import { ErrMsg } from "../global/errMsg";

export const ShowAdminEventsCategories = () => {
  const [resCategories, setResCategories] = useState<Res4AdminEventCount>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getAdminEventCatFn({ setErrMsg }).then((res) => {
      res && setResCategories(res);
    });
  }, []);

  const meetings = resCategories?.result.find(
    (state) => state.Meetings
  )?.Meetings;
  const training = resCategories?.result.find(
    (state) => state.Training
  )?.Training;
  const conference = resCategories?.result.find(
    (state) => state.Conference
  )?.Conference;
  const party = resCategories?.result.find((state) => state.Party)?.Party;

  return (
    <div className={styles.parent29C}>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Popular Event Categories by eVenue</h2>
            <Link to={`/event-centres/full-list`}>See more</Link>
          </div>
          <section className={styles.container29C}>
            <Link to={`/event/ev/meetings`}>
              <div>
                <h3>Meetings</h3>
                <p>{meetings} venues</p>
              </div>
            </Link>
            <Link to={`/event/ev/training`}>
              <div>
                <h3>Training</h3>
                <p>{training} venues</p>
              </div>
            </Link>
            <Link to={`/event/ev/conference`}>
              <div>
                <h3>Conference</h3>
                <p>{conference} venues</p>
              </div>
            </Link>
            <Link to={`/event/ev/party`}>
              <div>
                <h3>Party</h3>
                <p>{party} venues</p>
              </div>
            </Link>
          </section>
        </>
      )}
    </div>
  );
};
