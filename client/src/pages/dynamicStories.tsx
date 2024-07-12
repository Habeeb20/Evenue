import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrMsg } from "../components/global/errMsg";
import { VideoCardAllInfo } from "../components/global/videoCardAllInfo";
import getAllStoryFn from "../lib/story/getAll";
import { Res4AllStories } from "../typesAndInterfaces/stories/res4AllStories";
import styles from "./styles/shortVideosOPC.module.css";

export const DynamicStories = () => {
  const [vidsRes, setVidsRes] = useState<Res4AllStories>();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { story_id } = useParams();

  if (!story_id) {
    navigate("/");
    throw new Error("Missing story_id");
  }

  useEffect(() => {
    try {
      getAllStoryFn({ story_id, setErrMsg }).then((res) => {
        setVidsRes(res);
      });
    } catch (error) {}
  }, [story_id]);

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
