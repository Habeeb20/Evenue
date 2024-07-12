import { LoneVid } from "../../typesAndInterfaces/shortVideos/getAllInfo";
import { VideoCard } from "./videoCard";
import styles from "./styles/videoCardEFM.module.css";
import { formatTimestampDiff } from "./formatTimeDiff";
import { Share } from "./share";
import { useState } from "react";
import { AddCommentForm } from "../shortVideos/addCommentForm";
import addLikeFn from "../../lib/shortVideos/addLike";
import { InlineErrMsg } from "./inlineErrMsg";
import { InlineSuccessMsg } from "./inllineSuccessMsg";
import unLikeFn from "../../lib/shortVideos/unLike";
import { OneStory } from "../../typesAndInterfaces/stories/res4AllStories";
import { baseURL } from "../../lib/global/urls";
interface Props extends LoneVid {
  bigPage?: boolean;
}

interface Props1 extends OneStory {
  bigPage?: boolean;
}
export const VideoCardAllInfo = (props: Props | Props1) => {
  const [hideShare, setHideShare] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [likeState, setLikeState] = useState(
    (props as Props)["user_has_liked"] ? 1 : 0
  );

  if ("first_name" in props) {
    return (
      <div className={styles.cardEFM}>
        <div>
          <VideoCard {...props} />
        </div>
        <div className={styles.cardInfo}>
          <section>
            <div>
              <div className={styles.userImgBox}>
                <img
                  src={props.img}
                  alt={`${props.first_name} ${props.last_name}`}
                />
              </div>
              <div>
                <h3>
                  {props.first_name} {props.last_name}
                </h3>
              </div>
              {/* <div>
                <p>{formatTimestampDiff(props.posted_on)}</p>
              </div> */}
            </div>
            <div>
              <div>
                <img
                  src="/home/download_icon.svg"
                  alt="download"
                  onClick={() => {
                    const videoUrl = props.video;
                    fetch(videoUrl)
                      .then((response) => response.blob())
                      .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${props.first_name} ${props.last_name}.mp4`; // Change the filename as needed
                        a.click();
                        URL.revokeObjectURL(url);
                      });
                  }}
                  className={styles.actionIcon}
                />
              </div>
              {/* <div>
                <img
                  src="/home/share.svg"
                  alt="share"
                  onClick={() => setHideShare((prev) => !prev)}
                  className={styles.actionIcon}
                />
              </div>  */}

              {/* {!hideShare && (
                <Share
                  uRL={`${uRL}/stories/${props.id}`}
                  title={`${props.first_name} ${props.last_name} story`}
                  hashtag="#evenueStory"
                  summary={`${props.first_name}'s ${props.last_name} story`}
                  source="https://evenue.com"
                />
              )} */}
            </div>
          </section>
        </div>
        {errMsg && <InlineErrMsg errMsg={errMsg} />}
        {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
      </div>
    );
  } else {
    const handleLikeToggle = async () => {
      try {
        const newLikeState = likeState === 1 ? 0 : 1; // Toggle between 1 and 0
        setLikeState(newLikeState);

        const response = await (newLikeState === 1 ? addLikeFn : unLikeFn)({
          video_id: props.id,
          setErrMsg,
        });

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
      <div className={styles.cardEFM}>
        <div>
          <VideoCard {...props} />
        </div>
        <div className={styles.cardInfo}>
          <section>
            <div>
              <div className={styles.userImgBox}>
                <img
                  src={props.video_user_img}
                  alt={`${props.video_user_first_name} ${props.video_user_last_name}`}
                />
              </div>
              <div>
                <h3>
                  {props.video_user_first_name} {props.video_user_last_name}
                </h3>
              </div>
              <div>
                <p>{formatTimestampDiff(props.posted_on)}</p>
              </div>
            </div>
            <div>
              <div>
                <img
                  src="/home/download_icon.svg"
                  alt="download"
                  onClick={() => {
                    const videoUrl = props.video;
                    fetch(videoUrl)
                      .then((response) => response.blob())
                      .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${props.video_user_first_name} ${props.video_user_last_name}.mp4`; // Change the filename as needed
                        a.click();
                        URL.revokeObjectURL(url);
                      });
                  }}
                  className={styles.actionIcon}
                />
              </div>
              <div>
                <img
                  src="/home/share.svg"
                  alt="share"
                  onClick={() => setHideShare((prev) => !prev)}
                  className={styles.actionIcon}
                />
              </div>
              <div onClick={handleLikeToggle}>
                {likeState ? (
                  <img
                    src="/home/likeRed.svg"
                    alt="like"
                    className={styles.actionIcon}
                  />
                ) : (
                  <img
                    src="/home/black-outline_like.svg"
                    alt="unlike"
                    className={styles.actionIcon}
                  />
                )}

                <p>{props.likes}</p>
              </div>
              {!hideShare && (
                <Share
                  uRL={`${baseURL}/short-videos/${props.id}`}
                  title={`${props.video_user_first_name} ${props.video_user_last_name} short video`}
                  hashtag="#evenueShortVideo"
                  summary={props.description.slice(0, 100)}
                  source="https://evenue.com"
                />
              )}
            </div>
            <div>
              <p>
                <span>
                  {props.video_user_first_name} {props.video_user_last_name}:
                </span>{" "}
                {props.description}
              </p>
            </div>
            <section>
              <AddCommentForm video_id={props.id} />
            </section>
          </section>
          {props.comments && (
            <section>
              {props.comments.slice(0, 4).map((comment) => (
                <div key={comment.comment_id}>
                  <div className={styles.commentatorInfo}>
                    <div>
                      {comment.commentator_img && (
                        <img
                          src={comment.commentator_img}
                          alt={`${comment.commentator_username}`}
                        />
                      )}
                    </div>
                    <div>
                      <p>{comment.commentator_username}</p>
                    </div>
                    <div>
                      {comment.created_at && (
                        <p>{formatTimestampDiff(comment.created_at)}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
        {errMsg && <InlineErrMsg errMsg={errMsg} />}
        {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
      </div>
    );
  }
};
