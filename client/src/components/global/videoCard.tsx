import { Link } from "react-router-dom";
import { LoneShortVid } from "../../typesAndInterfaces/shortVideos/getLimitedInfo";
import styles from "./styles/videoCardFBE.module.css";
import increaseViewFn from "../../lib/shortVideos/increaseView";
import { LoneStory } from "../../typesAndInterfaces/stories/resLimitedInfo";

// new Props
interface Props extends LoneShortVid {
  bigPage?: boolean;
  src?: number;
}

interface Props1 extends LoneStory {
  bigPage?: boolean;
  src?: number;
}

export const VideoCard = (props: Props | Props1) => {
  if (props.bigPage) {
    return (
      <div className={`${styles.videoCardFBE} ${styles.bigPage}`}>
        <video controls>
          <source
            src={props.video}
            type="video/webm"
          />

          <source
            src={props.video}
            type="video/mp4"
          />

          <p>
            Your browser doesn't support HTML video. Here is a
            <a
              href={props.video}
              download={props.video}
            >
              link to the video
            </a>{" "}
            instead.
          </p>
        </video>
        <div>
          <p>
            <img
              src="/home/icon-park-outline_like.svg"
              alt="like"
            />
            {props.likes.toLocaleString()}
          </p>
          <p>
            {props.views.toLocaleString()}{" "}
            {props.views === 1 ? "view" : "views"}{" "}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={props.src ? `/stories/${props.id}` : `/short-videos/${props.id}`}
        className={styles.videoCardFBE}
        onClick={() => increaseViewFn({ video_id: props.id })}
      >
        <video controls>
          <source
            src={props.video}
            type="video/webm"
          />

          <source
            src={props.video}
            type="video/mp4"
          />

          {/* TODO: figure out how to nest this error without an error */}
          {/* <p>
            Your browser doesn't support HTML video. Here is a
            <a
              href={props.video}
              download={props.video}`
            >
              link to the video
            </a>{" "}
            instead.
          </p> */}
        </video>
        <div>
          <p>
            <img
              src="/home/icon-park-outline_like.svg"
              alt="like"
            />
            {props.likes.toLocaleString()}
          </p>
          <p>
            {props.views.toLocaleString()}{" "}
            {props.views === 1 ? "view" : "views"}{" "}
          </p>
        </div>
      </Link>
    );
  }
};
