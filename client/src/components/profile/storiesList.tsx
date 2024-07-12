import { useEffect, useState } from "react";
import getStoriesFn from "../../lib/story/getLimitedInfo";
import { ResStoryLimitedInfo } from "../../typesAndInterfaces/stories/resLimitedInfo";
import { ErrMsg } from "../global/errMsg";
import { VideoCard } from "../global/videoCard";
import styles from "../../pages/styles/shortVideosOPC.module.css";

export const StoriesList = () => {
  const [vidsRes, setVidsRes] = useState<ResStoryLimitedInfo>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      getStoriesFn({ setErrMsg }).then((res) => {
        setVidsRes(res);
      });
    } catch (error) {}
  }, []);

  const vidsResContent = vidsRes?.result.map((vid) => (
    <VideoCard
      key={vid.id}
      {...vid}
      src={vid.id}
    />
  ));

  return (
    <>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <div className={styles.containerOPC}>
          {/* <div>
            <button onClick={handleNavigate2PostVideo}>Post video</button>
            {showLoginErr && <LoginNotice />}
          </div> */}
          <div className={styles.vidsArea}>{vidsResContent}</div>
        </div>
      )}
    </>
  );
};
