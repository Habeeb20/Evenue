import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrMsg } from "../components/global/errMsg";
import { VideoCardAllInfo } from "../components/global/videoCardAllInfo";
import getShortVideosAllFn from "../lib/shortVideos/getAllInfo";
import { GetVidsAllRes } from "../typesAndInterfaces/shortVideos/getAllInfo";
import styles from "./styles/shortVideosOPC.module.css";

export const DynamicShortVideos = () => {
  const [vidsRes, setVidsRes] = useState<GetVidsAllRes>();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { video_id } = useParams();

  if (!video_id) {
    navigate("/");
    throw new Error("Missing video_id");
  }

  useEffect(() => {
    try {
      getShortVideosAllFn({ video_id, setErrMsg }).then((res) => {
        setVidsRes(res);
      });
    } catch (error) {}
  }, [video_id]);

  const vidsResContent = vidsRes?.result.map((vid) => (
    <VideoCardAllInfo
      key={vid.id}
      {...vid}
      bigPage
    />
  ));
  return (
    <>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <div className={styles.containerOPC}>{vidsResContent}</div>
      )}
    </>
  );
};
