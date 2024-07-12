import { useState } from "react";
import addReviewFn from "../../lib/eventsServices/addReview";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import { InlineErrMsg } from "../global/inlineErrMsg";
import styles from "./styles/addReviewXCB.module.css";

export const AddReview = ({ eservice_id }: { eservice_id: string }) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      addReviewFn({
        event_service_id: eservice_id,
        rating,
        review,
        setErrMsg,
      }).then((res) => {
        if (res && res.message.includes("success")) {
          setSuccessMsg(res.message);
          setReview("");
        }
      });
    } catch (error) {}
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.containerXCB}
      >
        <label htmlFor="rating">Rating</label>
        <select
          name="rating"
          id="rating"
          onChange={(e) => setRating(e.target.value)}
          required
          aria-required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="review">Post review</label>
        <input
          type="text"
          onChange={(e) => setReview(e.target.value)}
          name="review"
          value={review}
          required
          aria-required
        />
        <button>Post</button>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </>
  );
};
