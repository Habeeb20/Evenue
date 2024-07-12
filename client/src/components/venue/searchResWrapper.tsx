import { Venue } from "../../typesAndInterfaces/venues/getAll";
import LimitedInfoCard from "./limitedInfoCard";
import styles from "./styles/searchResWrapper2PA.module.css";

export const SearchResWrapper = (props: Venue) => {
  return (
    <div className={styles.container2PA}>
      <LimitedInfoCard
        key={props.id}
        {...props}
      />
    </div>
  );
};
