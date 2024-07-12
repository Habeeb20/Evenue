import { useEffect, useState } from "react";
import { GetShortVidsRes } from "../typesAndInterfaces/shortVideos/getLimitedInfo";
import getShortVideosFn from "../lib/shortVideos/getLimitedInfo";
import { VideoCard } from "../components/global/videoCard";
import styles from "./styles/shortVideosOPC.module.css";
import { ErrMsg } from "../components/global/errMsg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginNotice } from "../components/global/loginNotice";
import { Helmet } from "react-helmet";

export const ShortVideos = () => {
  const [vidsRes, setVidsRes] = useState<GetShortVidsRes>();
  const [errMsg, setErrMsg] = useState("");
  const [showLoginErr, setShowLoginErr] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getShortVideosFn({ setErrMsg }).then((res) => {
        setVidsRes(res);
      });
    } catch (error) {}
  }, []);

  const vidsResContent = vidsRes?.result.map((vid) => (
    <VideoCard key={vid.id} {...vid} />
  ));

  function handleNavigate2PostVideo() {
    if (!token) {
      setShowLoginErr(true);
      setTimeout(() => {
        setShowLoginErr(false);
      }, 10000);
      return;
    } else {
      navigate("/upload-short-videos");
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Short Videos</title>
        <link rel="canonical" href="https://evenue.ng/short-videos" />
      </Helmet>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <div className={styles.containerOPC}>
          <div>
            <button onClick={handleNavigate2PostVideo}>Post video</button>
            {showLoginErr && <LoginNotice />}
          </div>
          <div className={styles.vidsArea}>{vidsResContent}</div>
        </div>
      )}
    </>
  );
};
