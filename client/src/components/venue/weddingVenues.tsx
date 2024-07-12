import LimitedInfoCard from "./limitedInfoCard";
import { useEffect, useState } from "react";
import { VenueResponse } from "../../typesAndInterfaces/venues/getAll";
import styles from "./styles/weddingVenuesDE7.module.css";
import getAllVenuesFn from "../../lib/venues/getAll";
import { Link } from "react-router-dom";
import { ErrMsg } from "../global/errMsg";

export const BlankVenue = ({
  identifierValue,
  title,
}: {
  title: string;
  identifierValue: string;
}) => {
  const [venues, setVenues] = useState<VenueResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getAllVenuesFn({ categoryIdentifier: identifierValue, setErrMsg })
      .then((res) => {
        setVenues(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, [identifierValue]);

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
    <div className={styles.containerDE7}>
      <div className={styles.header}>
        <h1>{title}</h1>
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
