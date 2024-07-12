import { useState } from "react";
import addComment2PostFn from "../../lib/groups/addComment2Post";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import styles from "./styles/addCommentFormCT6.module.css";
import { MaxInputLength } from "../global/maxInputLength";

export const AddCommentForm = ({
  group_post_id,
}: {
  group_post_id: number;
}) => {
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (comment === "") {
      setErrMsg("Add a comment");
    }

    try {
      const res = await addComment2PostFn({
        group_post_id,
        comment,
        setErrMsg,
      });
      if (res?.message.includes("success")) {
        setSuccessMsg(res.message);
      }
    } catch (error) {}
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formCT6}>
        <label htmlFor="comment"></label>
        <input
          type="text"
          placeholder="Write comment"
          name="comment"
          onChange={(e) => setComment(e.target.value)}
          required
          aria-required
          value={comment}
          id="comment"
          maxLength={500}
        />

        <button>Send</button>
      </form>
      {comment.length === 500 && <MaxInputLength />}
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </div>
  );
};
