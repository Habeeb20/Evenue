import { Hero } from "../components/home/hero";
import { useState } from "react";
import LimitedInfoCard from "../components/global/limitedInfoCard";
import searchFn from "../lib/events/search";
import { Search } from "../typesAndInterfaces/events/search";
import { Response } from "../typesAndInterfaces/events/getLimitedInfo";
import { DefaultBody } from "../components/home/defaultBody";
import styles from "./styles/homeR58.module.css";
import { ErrMsg } from "../components/global/errMsg";
import { Helmet } from "react-helmet";

/* Notes: 
Interfaces with FU. e.g, GetEventServiceFUInfo = GetEventServiceFullInfo
Interfaces with LI. e.g, GetEventServiceLIInfo = GetEventServiceLimitedInfo
*/

const Home = () => {
  // state for search
  const [formDetails, setFormDetails] = useState<Search>({
    name: "",
    location: "",
    category: "",
  });
  const [events, setEvents] = useState<Response>();
  const [errMsg, setErrMsg] = useState(""); /* pass to Hero */

  async function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await searchFn({
        name: formDetails.name ?? "",
        location: formDetails.location ?? "",
        category: formDetails.category ?? "",
        setErrMsg,
      });

      setEvents(res);
      setErrMsg("");
    } catch (error) {}
  }

  const content = events?.result?.map((event) => (
    <LimitedInfoCard key={event.event_id} {...event} />
  ));

  return (
    <article>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evenue</title>
        <link rel="canonical" href="https://evenue.ng" />
      </Helmet>
      {/* Pass the states to the Hero */}
      <Hero
        formDetails={formDetails}
        setFormDetails={setFormDetails}
        handleSearch={handleSearch}
      />
      {events || errMsg ? (
        <>
          {errMsg ? (
            <ErrMsg errMsg={errMsg} />
          ) : (
            <div className={styles.containerR58a}>{content}</div>
          )}
        </>
      ) : (
        <>
          <DefaultBody />
        </>
      )}
    </article>
  );
};
export default Home;
