import { useParams } from "react-router-dom";
import { BlankVenue4States } from "./blankVenue4States";
import styles from "./styles/viewByCategoryDKI.module.css";

export const ViewByLocation = () => {
  const { location_identifier } = useParams();

  if (!location_identifier) {
    throw new Error("pass category view");
  }
  // capitalize title
  const title =
    location_identifier.charAt(0).toUpperCase() + location_identifier.slice(1);
  return (
    <article className={styles.containerDKI}>
      <BlankVenue4States
        locationIdentifier={location_identifier}
        title={`${title} venues`}
      />
    </article>
  );
};
