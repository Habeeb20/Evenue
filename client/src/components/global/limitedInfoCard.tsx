import { EventLInfo } from "../../typesAndInterfaces/events/getLimitedInfo";
import styles from "./styles/limitedInfoCard0Po.module.css";
import { formatDate, formatTime } from "./formatDate";
import { Link } from "react-router-dom";

const LimitedInfoCard = (props: EventLInfo) => {
  return (
    <div className={styles.card0Po}>
      <img
        src={props.first_img}
        alt="event"
      />
      <div>
        <h4>
          {props.name.length > 30
            ? props.name.slice(0, 30) + "..."
            : props.name}
        </h4>
        <p>
          <img
            src="/home/system-uicons_location.svg"
            alt="location"
          />{" "}
          {props.location.length > 30
            ? props.location.slice(0, 30) + "..."
            : props.location}
        </p>
        <div>
          <p>{formatDate(props.start_date_and_time.toString())}</p>
          <p>{formatTime(props.start_date_and_time.toString())}</p>
        </div>
      </div>
      <div>
        <div>
          <p>
            {props.price === 0 || props.price === undefined
              ? "Free"
              : `₦${props.price.toLocaleString()}`}
          </p>
          <Link to={`/events/${props.event_id}`}>View</Link>{" "}
          {/* placeholder to attribute */}
        </div>
      </div>
    </div>
  );
};

export default LimitedInfoCard;
