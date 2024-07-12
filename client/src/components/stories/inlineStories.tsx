import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllStoryFn from "../../lib/story/getAll";
import { Res4AllStories } from "../../typesAndInterfaces/stories/res4AllStories";
import { InlineErrMsg } from "../global/inlineErrMsg";
import styles from "./style/inlineStoriesCE4.module.css";

export const InlineStories = () => {
  const [vidsRes, setVidsRes] = useState<Res4AllStories>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      getAllStoryFn({ setErrMsg }).then((res) => {
        setVidsRes(res);
      });
    } catch (error) {}
  }, []);

  return (
    <>
      <div className={styles.containerCE4}>
        {vidsRes?.result.map((vid) => (
          <Link
            key={vid.id}
            to={`/stories/${vid.id}`}
          >
            <img
              src={vid.img}
              alt="story"
            />
            <p>
              {vid.first_name} {vid.last_name}
            </p>
          </Link>
        ))}
      </div>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
    </>
  );
};
