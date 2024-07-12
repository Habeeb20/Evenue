import { useEffect, useState } from "react";
import deleteStoryFn from "../../lib/admin/deleteStory";
import getStoriesFn, { Welcome6 } from "../../lib/admin/getStories";
import { formatTimestampDiff } from "../global/formatTimeDiff";

export const StoriesListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [storiesList, setStoriesList] = useState<Welcome6>();
  useEffect(() => {
    (async () => {
      const res = await getStoriesFn({ setErrMsg });

      res && setStoriesList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteStoryFn({
      setErrMsg,
      story_id: id.toString(),
    });

    if (res?.message.includes("success")) {
      const res1 = await getStoriesFn({ setErrMsg });
      res1 && setStoriesList(res1);
    }
  };
  return (
    <div>
      Stories
      {errMsg && <p>{errMsg}</p>}
      <ol>
        {storiesList?.result.map((story) => (
          <li key={story.id}>
            {formatTimestampDiff(story.created_at)}
            <button onClick={() => handleDelete(story.id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
