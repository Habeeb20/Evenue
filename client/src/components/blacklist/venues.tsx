import LimitedInfoCard from "../venue/limitedInfoCard";
import { useEffect, useState } from "react";
import { VenueResponse } from "../../typesAndInterfaces/venues/getAll";
// import styles from "../venue/styles/weddingVenuesDE7.module.css";
import getAllVenuesFn from "../../lib/venues/getAll";
import { Link } from "react-router-dom";
import { ErrMsg } from "../global/errMsg";
import styles from "./styles/venueSRW.module.css";

export const BlacklistVenue = () => {
  const [venues, setVenues] = useState<VenueResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getAllVenuesFn({ blacklistIdentifier: "blacklistIdentifier", setErrMsg })
      .then((res) => {
        setVenues(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  const content = venues?.finalResult[0].slice(0, 6).map((venue) => (
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
    <div className={styles.containerSRW}>
      <div className={styles.header}>
        <h1>Blacklisted venues</h1>
        {content && content.length > 6 && (
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
