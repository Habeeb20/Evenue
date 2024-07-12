import { Venue } from "../../typesAndInterfaces/venues/getAll";
import styles from "./styles/limitedInfoCard71U.module.css";
import { Link } from "react-router-dom";

const LimitedInfoCard = (props: Venue) => {
  const guestSingluarOrPlural = props.no_of_guest === 1 ? `guest` : `guests`;

  // display starIcon the number of times of props.rating
  const stars: JSX.Element[] = [];
  for (let i = 0; i < props.rating; i++) {
    stars.push(
      <img
        src="/home/star.svg"
        alt="star"
        className={styles.starIcon}
        key={i}
      />
    );
  }
  return (
    <Link
      to={`/venues/${props.id}`}
      className={styles.card71U}
    >
      <img
        src={props.first_img}
        alt="venue"
      />
      <div>
        <h4>
          {props.title.length > 30
            ? props.title.slice(0, 30) + "..."
            : props.title}
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
      </div>
      {props.rating > 0 ? (
        <div className={`${styles.ratingArea}`}>
          {/* rating goes here along with rating related details */}
          <div>{stars}</div>
          <div>
            <div>{Math.round(props.rating)}</div>
            <div>{/* total number of those who rated here */} (100)</div>
          </div>
        </div>
      ) : (
        <div>
          <p>No Rating</p>
        </div>
      )}
      <div>
        <div>
          <p>
            {props.no_of_guest === 0 || props.no_of_guest === undefined
              ? "Invite Only"
              : `Up to ${props.no_of_guest.toLocaleString()} ${guestSingluarOrPlural}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LimitedInfoCard;
