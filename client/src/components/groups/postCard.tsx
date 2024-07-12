import { useState } from "react";
import updatePostViewsFn from "../../lib/groups/updatePostViews";
import { OnePost } from "../../typesAndInterfaces/groups.ts/res4GetPosts";
import { formatTimestampDiff } from "../global/formatTimeDiff";
import { PostCTAs } from "./postCTAs";
import styles from "./styles/postCard835.module.css";
import { AddCommentForm } from "./addCommentForm";

interface NewProps extends OnePost {
  group_post_id: number;
  group_id: string;
}

export const PostCard = (props: NewProps) => {
  const { group_post_id } = props;
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  async function handleMouseEnter() {
    // Set a timer to run the function after 5 seconds
    const id = setTimeout(async () => {
      await updatePostViewsFn({ group_post_id });
    }, 5000);

    // Store the timer ID in state
    setTimerId(id);
  }

  function handleMouseLeave() {
    // If the mouse leaves before 5 seconds, clear the timer
    if (timerId !== null) {
      clearTimeout(timerId);

      // Reset the timer ID
      setTimerId(null);
    }
  }

  // Ensure unique comments before rendering
  const uniqueCommentsSet = new Set(
    props.post_comments.map((comment) => comment.comment_id)
  );
  const uniqueCommentIds = Array.from(uniqueCommentsSet); // Convert Set to array for iteration

  const filteredComments = uniqueCommentIds.map((commentId) =>
    props.post_comments.find((comment) => comment.comment_id === commentId)
  );

  return (
    <div
      className={styles.card835}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <div>
          <img
            src={props.owner_img}
            alt={props.owner_firstname + " " + props.owner_lastname}
            className={styles.img}
          />
        </div>
        <div>
          <h4>
            {props.owner_firstname} {props.owner_lastname}
          </h4>
          <p>{formatTimestampDiff(props.created_at)}</p>
          {props.imgs && (
            <section className={styles.postImgsArea}>
              <div>
                <div>
                  <div>
                    <img
                      src={props.imgs.split(",")[0]}
                      alt="star"
                      className={styles.starIcon}
                    />
                  </div>
                  {props.imgs.split(",")[1] && (
                    <div>
                      <img
                        src={props.imgs.split(",")[1]}
                        alt="star"
                        className={styles.starIcon}
                      />
                    </div>
                  )}
                </div>
                {props.imgs.split(",")[2] && (
                  <div>
                    <div>
                      <img
                        src={props.imgs.split(",")[2]}
                        alt="star"
                        className={styles.starIcon}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          <p>{props.post}</p>
        </div>
      </div>
      <hr />
      <div className={styles.postCTAs}>
        <PostCTAs
          userLiked={props.user_liked}
          views={props.views}
          group_id={props.group_id}
          first_name={props.owner_firstname}
          last_name={props.owner_lastname}
          about={props.post}
          post_id={props.id}
        />
      </div>
      <hr />
      <section className={styles.postCommentsArea}>
        <div>{filteredComments.length > 1 && <p>view more comments</p>}</div>

        <div>
          {filteredComments.map(
            (comment) =>
              comment?.comment && (
                <div className={styles.comment} key={comment.comment_id}>
                  {comment.commentator_img && (
                    <div>
                      <img
                        src={comment.commentator_img}
                        alt={comment.commentator_first_name ?? "User"}
                      />
                    </div>
                  )}
                  <div className={styles.commentDetails}>
                    <h5>
                      {comment.commentator_first_name}{" "}
                      {comment.commentator_last_name}
                    </h5>
                    {comment.created_at && (
                      <p>{formatTimestampDiff(comment.created_at)}</p>
                    )}

                    <p className={styles.commentBody}>{comment.comment}</p>
                  </div>
                </div>
              )
          )}
        </div>
      </section>
      <>
        <AddCommentForm group_post_id={props.group_post_id} />
      </>
    </div>
  );
};
