import { useEffect, useState } from "react";
import deleteStoryFn from "../../lib/admin/deleteStory";
import getStoriesFn, { Welcome6 } from "../../lib/admin/getStories";
import { formatTimestampDiff } from "../global/formatTimeDiff";
import getShortVidsFn, { Welcome61 } from "../../lib/admin/getShortVids";
import deleteShortVidsFn from "../../lib/admin/deleteShortVid";

export const ShortVideoListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [vidList, setVidList] = useState<Welcome61>();
  useEffect(() => {
    (async () => {
      const res = await getShortVidsFn({ setErrMsg });

      res && setVidList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteShortVidsFn({
      setErrMsg,
      short_vid_id: id.toString(),
    });

    if (res?.message.includes("success")) {
      const res1 = await getShortVidsFn({ setErrMsg });
      res1 && setVidList(res1);
    }
  };
  return (
    <div>
      Short Videos
      {errMsg && <p>{errMsg}</p>}
      <ol>
        {vidList?.result.map((vid) => (
          <li key={vid.id}>
            {formatTimestampDiff(vid.posted_on)}
            <button onClick={() => handleDelete(vid.id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
