import { Helmet } from "react-helmet";
import { GlamoreAd } from "../components/home/glamoreAd";
import { Upcoming } from "../components/home/upcoming";
import { Hero } from "../components/ticketing/hero";
import { SubHeading } from "../components/ticketing/subHeading";
import styles from "./styles/ticketingRRX.module.css";

const Ticketing = () => {
  return (
    <article className={styles.containerRRX}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ticketing</title>
        <link rel="canonical" href="https://evenue.ng/ticketing" />
      </Helmet>
      <div className={styles.topContent}>
        <Hero />
        <section>
          <SubHeading />
        </section>
        <section>
          <Upcoming />
        </section>
      </div>

      <section>
        <GlamoreAd />
      </section>
    </article>
  );
};
export default Ticketing;
