import { Link } from "react-router-dom";
import styles from "./styles/heroWZ5.module.css";
export const Hero = () => {
  return (
    <div className={styles.containerWZ5}>
      <div className={styles.imgBox}>
        <div>
          <h1>EVENT TICKETS</h1>
          <p>Start a party</p>
          <p>Start a party</p>
        </div>
      </div>
      <div className={styles.contentBox}>
        <p>
          Ready to bring your event to life? Join E-Venue and start creating
          unforgettable experiences. Our platform provides everything you need
          to plan, promote, and manage your event, all in one place. Get started
          today and watch your event flourish!
        </p>
        <hr />
        <hr />
        <Link to="/create-event">
          <h4>Get Started</h4>
        </Link>{" "}
        <hr />
      </div>
    </div>
  );
};
