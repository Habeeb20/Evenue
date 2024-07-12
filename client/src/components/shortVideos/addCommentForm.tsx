import { useState } from "react";
import addCommentFn from "../../lib/shortVideos/addComment";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import styles from "./styles/addCommentFormCBA.module.css";

export const AddCommentForm = ({ video_id }: { video_id: number }) => {
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (comment === "") {
      setErrMsg("Please enter a comment");
    }
    try {
      const res = await addCommentFn({ video_id, comment, setErrMsg });
      if (res?.message.includes("successfully")) {
        setSuccessMsg(res.message);
        setComment("");
      }
    } catch (error) {}
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.formCBA}
      >
        <input
          type="text"
          placeholder="Add a comment"
          name="comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button type="submit">Comment</button>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </>
  );
};
