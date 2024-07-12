import { Link } from "react-router-dom";
import { OneGroup } from "../../typesAndInterfaces/groups.ts/res4GetListLInfo";
import styles from "./styles/cardFDS.module.css";

export const Card = (props: OneGroup) => {
  return (
    <div className={styles.cardFDS}>
      <div>
        <img
          src={props.logo}
          alt={props.name}
        />
      </div>
      <div>
        <h3>
          {props.name.length > 20
            ? props.name.slice(0, 20) + "..."
            : props.name}
        </h3>
      </div>
      <div>
        <p>
          {props.member_total > 1
            ? props.member_total + " Members"
            : props.member_total + " Member"}{" "}
        </p>
        <p>
          {props.total_post_last_24_hrs === 1
            ? props.total_post_last_24_hrs + " post"
            : props.total_post_last_24_hrs + " posts"}{" "}
          today
        </p>
      </div>
      <div>
        <Link to={`/groups/${props.id}`}>View</Link>
      </div>
    </div>
  );
};
