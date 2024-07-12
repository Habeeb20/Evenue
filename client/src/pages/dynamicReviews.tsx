import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getServiceReviewsFn from "../lib/eventsServices/getReviews";
import { Res4ServiceReviews } from "../typesAndInterfaces/eventServices/res4Reviews";
import { ErrMsg } from "../components/global/errMsg";
import styles from "./styles/dynamicReview48O.module.css";

export const DynamicReviews = () => {
  const [res4Reviews, setRes4Reviews] = useState<Res4ServiceReviews>();
  const [errMsg, setErrMsg] = useState("");
  const { service_id, business_name } = useParams();

  if (!service_id) {
    throw new Error("Missing service_id");
  }
  useEffect(() => {
    getServiceReviewsFn({ sProvider_id: service_id, setErrMsg }).then((res) => {
      res && setRes4Reviews(res);
    });
  }, [service_id]);

  const reviews = res4Reviews?.finalResult[0].map((r) => (
    <div
      key={r.id}
      className={styles.container480}
    >
      <img
        src={r.reviewer_img}
        alt={`${r.reviewer_first_name} ${r.reviewer_last_name}`}
        className="dp_img"
      />
      <div>
        <h4>
          {r.reviewer_first_name} {r.reviewer_last_name}
        </h4>
        <p>{r.review}</p>
      </div>
    </div>
  ));

  const reviewsTotal = res4Reviews?.finalResult[1].map((t) => (
    <span>{t.total}</span>
  ));

  return (
    <>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <div className={styles.parent480}>
          <h1>
            {business_name} Reviews ({reviewsTotal})
          </h1>
          {reviews}
        </div>
      )}
    </>
  );
};
