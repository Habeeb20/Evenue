import getAllVenuesFn from "../../lib/venues/getAll";
import LimitedInfoCard from "./limitedInfoCard";
import { useEffect, useState } from "react";
import { Slider } from "../global/slider";
import { VenueResponse } from "../../typesAndInterfaces/venues/getAll";
import styles from "./styles/popularVenuesCBL.module.css";
import { Link } from "react-router-dom";

export const PopularVenues = () => {
  const [venues, setVenues] = useState<VenueResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getAllVenuesFn({ popularIdentifier: "popularIdentifier", setErrMsg })
      .then((res) => {
        setVenues(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = venues?.finalResult[0].slice(0, 12).map((venue) => (
    <LimitedInfoCard
      key={venue.id}
      {...venue}
    />
  ));

  // problem of correct key attr here
  const total = venues?.finalResult[1].map((total, index) => (
    <span key={index}>{total.total}</span>
  ));

  return (
    <div className={styles.containerCBL}>
      <div className={styles.header}>
        <h1>Popular venues</h1>
        {/* {content && content.length > 2 && (
          <Link to={``}>View All ({total})</Link>
        )}{" "} */}
        {/* placeholder to attribute */}
      </div>
      {errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <section className={styles.contentArea}>
          <Slider content={content || []} />
        </section>
      )}
    </div>
  );
};
