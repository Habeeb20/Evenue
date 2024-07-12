import { EventServiceLimitedInfo } from "../../typesAndInterfaces/eventServices/getLimitedInfoForAll";
import styles from "../venue/styles/limitedInfoCard71U.module.css";
import { Link } from "react-router-dom";

const LimitedInfoCard = (props: EventServiceLimitedInfo) => {
  // display starIcon the number of times of props.rating
  const stars: JSX.Element[] = [];
  for (let i = 0; i < Number(props.rating); i++) {
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
      to={`/event-services/${props.id}`}
      className={styles.card71U}
    >
      <div>
        {/* fix key problem in img */}
        <img
          src={props.first_img}
          alt="venue"
        />
        <>{Number(props.verified) === 1 && <p>verified</p>}</>
      </div>
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
      </div>
      {Number(props.rating) > 0 && (
        <div className={styles.ratingArea}>
          {/* rating goes here along with rating related details */}
          <div>{stars}</div>
          <div>
            <div>{Math.round(Number(props.rating))}</div>
            <div>({props.total_raings_no})</div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default LimitedInfoCard;
