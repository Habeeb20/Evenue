import styles from "./styles/share7D3.module.css";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

interface Props {
  uRL: string;
  title: string;
  hashtag: string;
  summary: string;
  source: string;
}

export const Share = ({ uRL, title, hashtag, summary, source }: Props) => {
  return (
    <div className={styles.conatiner7D3}>
      <div className="Demo__some-network">
        <WhatsappShareButton
          url={uRL}
          title={`Attend, ${title}.`}
          separator=":: "
          className={`Demo__some-network__share-button `}
        >
          <WhatsappIcon
            size={32}
            round
          />
        </WhatsappShareButton>
      </div>
      <div className="Demo__some-network">
        <FacebookShareButton
          url={uRL}
          className={`Demo__some-network__share-button `}
          hashtag={hashtag}
        >
          <FacebookIcon
            size={32}
            round
          />
        </FacebookShareButton>
      </div>
      <div className="Demo__some-network">
        <TwitterShareButton
          url={uRL}
          title={`Attend, ${title}.`}
          className={`Demo__some-network__share-button `}
          hashtags={[hashtag]}
        >
          <XIcon
            size={32}
            round
          />
        </TwitterShareButton>
      </div>
      <div className="Demo__some-network">
        <LinkedinShareButton
          url={uRL}
          className={`Demo__some-network__share-button `}
          summary={summary}
          source={source}
        >
          <LinkedinIcon
            size={32}
            round
          />
        </LinkedinShareButton>
      </div>
    </div>
  );
};
