import styles from "./styles/venueAd8GN.module.css";
import { Link } from "react-router-dom";

interface Props {
  props: string;
  body: string;
  toAttr: string;
}

// props have commas for the purpose of split.
export const VenueOrEventAd = ({ props, body, toAttr }: Props) => {
  const start = props.split(",")[0];
  const firstSpan = props.split(",")[1];
  const secondSpan = props.split(",")[2];
  const middleBody = props.split(",")[3];
  const end = props.split(",")[4];
  return (
    <div className={styles.container8GN}>
      <div className={styles.venueAd8GN}>
        <h4>
          {start} <span>{firstSpan}</span> <span>{secondSpan}</span>{" "}
          {middleBody}
          {end && <span>{end}</span>}
        </h4>
        <p>{body}</p>
      </div>
      <Link to={`/${toAttr}`}>
        {toAttr.slice(0)[0].toUpperCase() + toAttr.slice(1)}
      </Link>{" "}
      {/* placeholder to attribute */}
    </div>
  );
};
