import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCategoryFn from "../../lib/venues/getCategoryFn";
import { Res4Category } from "../../typesAndInterfaces/venues/getCategoryCount";
import styles from "../event/styles/eventsByCat29C.module.css";
import { ErrMsg } from "../global/errMsg";

export const ShowCategoriesFullList = () => {
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
  const boardrooms = resCategories?.result.find(
    (state) => state.Boardrooms
  )?.Boardrooms;
  const wedding = resCategories?.result.find(
    (state) => state.Weddings
  )?.Weddings;
  const brand_promotion = resCategories?.result.find(
    (state) => state.Brand_promotion
  )?.Brand_promotion;
  const class_reunion = resCategories?.result.find(
    (state) => state.Class_reunion
  )?.Class_reunion;
  const pool_party = resCategories?.result.find(
    (state) => state.Pool_party
  )?.Pool_party;
  const award_show = resCategories?.result.find(
    (state) => state.Award_show
  )?.Award_show;
  const exhibition = resCategories?.result.find(
    (state) => state.Exhibition
  )?.Exhibition;
  const bachelor_party = resCategories?.result.find(
    (state) => state.Bachelor_party
  )?.Bachelor_party;
  const others = resCategories?.result.find((state) => state.Others)?.Others;

  return (
    <div className={styles.parent29C}>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          <h2>Popular Event Centres Categories</h2>
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
            <Link to={`/venues/ci/brand_promotion`}>
              <div>
                <h3>Brand promotion</h3>
                <p>{brand_promotion} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/boardrooms`}>
              <div>
                <h3>Boardrooms</h3>
                <p>{boardrooms} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/wedding`}>
              <div>
                <h3>Wedding</h3>
                <p>{wedding} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/award_show`}>
              <div>
                <h3>Award Show</h3>
                <p>{award_show} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/class_reunion`}>
              <div>
                <h3>Class Reunion</h3>
                <p>{class_reunion} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/pool_party`}>
              <div>
                <h3>Pool Party</h3>
                <p>{pool_party} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/exhibition`}>
              <div>
                <h3>Exhibition</h3>
                <p>{exhibition} venues</p>
              </div>
            </Link>
            <Link to={`/venues/ci/bachelor_party`}>
              <div>
                <h3>Bachelor Party</h3>
                <p>{bachelor_party} venues</p>
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
