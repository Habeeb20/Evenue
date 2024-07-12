import { useEffect, useState } from "react";
import getLimitedInfoForAllFn from "../../lib/eventsServices/getLimitedInfoForAll";
import { GetLimitedInfoForAllResponse } from "../../typesAndInterfaces/eventServices/getLimitedInfoForAll";
import LimitedInfoCard from "./limitedInfoCard";
import styles from "./styles/popularPhoto0G1.module.css";

// Todo: Use reusablilty to work on actions that occur when the buttons(btn1, etc) are clicked. Make the function call accept optional aguments
export const PopularPhotos = () => {
  const [eventServices, setEventServices] =
    useState<GetLimitedInfoForAllResponse>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLimitedInfoForAllFn({
      setErrMsg,
    })
      .then((res) => {
        setEventServices(res);
        setErrMsg("");
      })
      .catch((err) => {});
  }, []);

  // filiter the events with Photography/Videography category here
  const photographyContent = eventServices?.result
    .filter((event) => event.category === "Photography/Videography")
    .map((event) => (
      <LimitedInfoCard
        key={event.id}
        {...event}
      />
    ));

  // filiter the events with Photography/Videography category here
  const makeUpContent = eventServices?.result
    .filter((event) => event.category === "make_up_artise")
    .map((event) => (
      <LimitedInfoCard
        key={event.id}
        {...event}
      />
    ));

  // filiter the events with Photography/Videography category here
  const designersContent = eventServices?.result
    .filter((event) => event.category === "designers")
    .map((event) => (
      <LimitedInfoCard
        key={event.id}
        {...event}
      />
    ));

  return (
    <div className={styles.container0G1}>
      <div className={styles.header}>
        {/* {content && content.length > 2 && (
          <Link to={``}>View All ({total})</Link>
        )}{" "} */}
        {/* placeholder to attribute */}
      </div>
      {errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <>
          <section>
            <h3>Popular Photography/Videographer</h3>
            <div>{photographyContent}</div>
          </section>
          <section>
            <h3>Popular make up artist</h3>
            <div>{makeUpContent}</div>
          </section>
          <section>
            <h3>Popular designers</h3>
            <div>{designersContent}</div>
          </section>
        </>
      )}
    </div>
  );
};
