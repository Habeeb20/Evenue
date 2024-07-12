import { useState } from "react";
import addPostLikeFn from "../../lib/groups/addLike";
import unlikePostFn from "../../lib/groups/unlike";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import { Share } from "../global/share";
import styles from "./styles/postCTAsKLZ.module.css";

export const PostCTAs = ({
  userLiked,
  views,
  group_id,
  first_name,
  last_name,
  about,
  post_id: group_post_id,
}: {
  userLiked: number;
  views: number;
  group_id: string;
  first_name: string;
  last_name: string;
  about: string;
  post_id: number;
}) => {
  const [hideShare, setHideShare] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [likeState, setLikeState] = useState(userLiked ? 1 : 0);

  const handleLikeToggle = async () => {
    try {
      const newLikeState = likeState === 1 ? 0 : 1; // Toggle between 1 and 0
      setLikeState(newLikeState);

      const response = await (newLikeState === 1
        ? addPostLikeFn
        : unlikePostFn)({ group_post_id, setErrMsg });

      if (response?.message.includes("success")) {
        setSuccessMsg(response.message);
      } else {
        const newLikeState = likeState === 1 ? 0 : 1;
        setLikeState(newLikeState); // Revert UI on failure
      }
    } catch (error) {
      console.error(error);
      const newLikeState = likeState === 1 ? 0 : 1;
      setLikeState(newLikeState);
    }
  };

  return (
    <>
      <div className={styles.containerKLZ}>
        <div>
          <span onClick={handleLikeToggle}>
            {likeState ? (
              <img src="/home/likeRed.svg" alt="red like" />
            ) : (
              <img src="/home/bx_like.svg" alt="unlike" />
            )}
            <p>{likeState ? "Unlike" : "Like"}</p>
          </span>
        </div>
        <div>
          <img src="/home/commentIcon.svg" alt="comment" />
          <p>Comment</p>
        </div>
        <div onClick={() => setHideShare((prev) => !prev)}>
          <img src="/home/share.svg" alt="share" />
          <p>Share</p>
        </div>
        {!hideShare && (
          <Share
            uRL={`https://e-venues.ooshinfo.com/api/v1/groups/${group_id}`}
            title={`${first_name} ${last_name} short video`} // change to name of the group
            hashtag="#evenueShortVideo"
            summary={about.slice(0, 100)}
            source="https://evenue.com"
          />
        )}
        <div>
          <p>{views === 1 ? views + " view" : views + " views"}</p>
        </div>
      </div>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </>
  );
};
