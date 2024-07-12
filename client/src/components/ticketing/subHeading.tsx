import { Link } from "react-router-dom";
import styles from "./styles/subHeadingOO2.module.css";

export const SubHeading = () => {
  return (
    <div className={styles.containerOO2}>
      <div>
        <h4>Start an Event and Get Tickets for them</h4>
        <p>
          Planning an event is an exciting journey, and at E-Venue, we make it
          easy to bring your vision to life and share it with the world. Whether
          you’re organizing a concert, conference, festival, or any other
          gathering, our platform provides the tools you need to start an event
          and manage ticket sales seamlessly. Planning an event is an exciting
          journey, and at E-Venue, we make it easy to bring your vision to life
          and share it with the world. Whether you’re organizing a concert,
          conference, festival, or any other gathering, our platform provides
          the tools you need to start an event and manage ticket sales
          seamlessly.
        </p>
        <Link to="/create-event">Create an Event</Link>{" "}
      </div>
      <div>
        <img src="/home/Rectangle 198.svg" alt="create event" />
      </div>
    </div>
  );
};
