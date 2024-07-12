import { Hero } from "../components/eventsShowcase/hero";
import { LatestEventsMedia } from "../components/eventsShowcase/latestEventsMedia";
import styles from "./styles/eventShowcaseGD4.module.css";

const EventShowcase = () => {
  return (
    <article className={styles.containerGD4}>
      <Hero />
      <div>
        <section>
          <LatestEventsMedia />
        </section>
      </div>
    </article>
  );
};
export default EventShowcase;
