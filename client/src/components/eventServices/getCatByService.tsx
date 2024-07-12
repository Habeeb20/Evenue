import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCountByCatFn from "../../lib/eventsServices/getCountByCategory";
import { Res4CountByCategory } from "../../typesAndInterfaces/eventServices/res4CountByCategory";
import styles from "../event/styles/eventsByCat29C.module.css";
import { ErrMsg } from "../global/errMsg";

export const EServiceCategoryFullList = () => {
  const [countByCat, setCountByCat] = useState<Res4CountByCategory>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      getCountByCatFn({ setErrMsg }).then((res) => {
        res && setCountByCat(res);
      });
    } catch (error) {}
  }, []);

  const dj = countByCat?.result.find((count) => count.dj)?.dj;
  const designersCount = countByCat?.result.find(
    (count) => count.total_designers
  )?.total_designers;
  const mkupartCount = countByCat?.result.find(
    (count) => count.total_make_up_artise
  )?.total_make_up_artise;
  const videoPhotoCount = countByCat?.result.find(
    (count) => count.total_photo_video_makers
  )?.total_photo_video_makers;

  return (
    <div className={styles.parent29C}>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          <h2>Popular Event Services</h2>
          <section className={styles.container29C}>
            <Link to={`/event-services/q/dj`}>
              <div>
                <h3>DJ's</h3>
                <p>{dj ?? 0} professionals</p>
              </div>
            </Link>
            <Link to={`/event-services/q/designers`}>
              <div>
                <h3>Designers</h3>
                <p>
                  {designersCount}{" "}
                  {designersCount?.length === 1
                    ? "professional"
                    : "professionals"}
                </p>{" "}
              </div>
            </Link>
            <Link to={`/event-services/q/make_up_artise`}>
              <div>
                <h3>Make up Artise</h3>
                <p>{mkupartCount} professionals</p>
              </div>
            </Link>
            <Link to={`/event-services/q/Photography/Videography`}>
              <div>
                <h3>Photography/Videography</h3>
                <p>{videoPhotoCount} professionals</p>
              </div>
            </Link>
          </section>
        </>
      )}
    </div>
  );
};
