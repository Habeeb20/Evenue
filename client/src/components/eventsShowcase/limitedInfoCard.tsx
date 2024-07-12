import { Link } from "react-router-dom";
import { EventShowcase } from "../../typesAndInterfaces/eventShowcase/getAllLimitedInfo";
import styles from "./styles/limitedInfoCardX38.module.css";

const LimitedInfoCard = (props: EventShowcase) => {
  return (
    <div className={styles.cardX38}>
      {/* placeholder to attribute */}
      <div>
        <img
          src={props.first_img}
          alt="venue"
        />
      </div>

      <section>
        <div>
          <h4>
            {props.name.length > 30
              ? props.name.slice(0, 30) + "..."
              : props.name}
          </h4>
        </div>
        <div>
          <p>{props.intro}</p>
        </div>
        <span>
          <Link to={`/events/${props.id}`}>
            <i>View Media</i>
          </Link>{" "}
        </span>
        {/* placeholder to attribute */}
      </section>
    </div>
  );
};

export default LimitedInfoCard;
