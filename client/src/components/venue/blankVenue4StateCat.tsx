import { useEffect, useState } from "react";
import getAllVenuesFn from "../../lib/venues/getAll";
import { VenueResponse } from "../../typesAndInterfaces/venues/getAll";
import { ErrMsg } from "../global/errMsg";
import LimitedInfoCard from "./limitedInfoCard";
import styles from "./styles/weddingVenuesDE7.module.css";

export const BlankVenue4StatesCat = ({
  locationIdentifier,
  title,
}: {
  title: string;
  locationIdentifier: string;
}) => {
  const [venues, setVenues] = useState<VenueResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getAllVenuesFn({ categoryIdentifier: locationIdentifier, setErrMsg })
      .then((res) => {
        setVenues(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, [locationIdentifier]);

  const content = venues?.finalResult[0].slice(0, 15).map((venue) => (
    <LimitedInfoCard
      key={venue.id}
      {...venue}
    />
  ));

  return (
    <div className={styles.containerDE7}>
      <div className={styles.header}>
        <h1>{title}</h1>
      </div>
      {errMsg ? (
        <>
          <ErrMsg errMsg={errMsg} />
        </>
      ) : (
        <div className={styles.contentArea}>{content}</div>
      )}
      {/* Implement pagination for showing next / prev pages of venue */}
    </div>
  );
};
