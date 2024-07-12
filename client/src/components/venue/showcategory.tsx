import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCategoryFn from "../../lib/venues/getCategoryFn";
import { Res4Category } from "../../typesAndInterfaces/venues/getCategoryCount";
import styles from "../event/styles/eventsByCat29C.module.css";
import { ErrMsg } from "../global/errMsg";

export const ShowCategories = () => {
  const [resCategories, setResCategories] = useState<Res4Category>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getCategoryFn({ setErrMsg }).then((res) => {
      res && setResCategories(res);
    });
  }, []);

  const meetings = resCategories?.result.find(
    (state) => state.Meetings
  )?.Meetings;
  const shows = resCategories?.result.find((state) => state.Shows)?.Shows;
  const others = resCategories?.result.find((state) => state.Others)?.Others;
  const awardShows = resCategories?.result.find(
    (state) => state.Award_show
  )?.Award_show;

  return (
    <div className={styles.parent29C}>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Popular Event Centres Categories</h2>
            <Link to={`/centres-categories/full-list`}>See more</Link>
          </div>

          <section className={styles.container29C}>
            <Link to={`/venues/ci/meetings`}>
              <div>
                <h3>Meetings</h3>
                <p>{meetings} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/shows`}>
              <div>
                <h3>Shows</h3>
                <p>{shows} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/award_show`}>
              <div>
                <h3>Award Show</h3>
                <p>{awardShows} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/others`}>
              <div>
                <h3>Others</h3>
                <p>{others} venues</p>
              </div>
            </Link>
          </section>
        </>
      )}
    </div>
  );
};
