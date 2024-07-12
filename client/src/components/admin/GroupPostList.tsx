import { useEffect, useState } from "react";
import deleteGroupPostFn from "../../lib/admin/deleteGroupPost";
import getGroupPostListFn, {
  Welcome63,
} from "../../lib/admin/getGroupPostList";

export const GroupPostListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [vidList, setVidList] = useState<Welcome63>();
  useEffect(() => {
    (async () => {
      const res = await getGroupPostListFn({ setErrMsg });

      res && setVidList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteGroupPostFn({
      setErrMsg,
      group_post_id: id.toString(),
    });

    if (res?.message.includes("success")) {
      const res1 = await getGroupPostListFn({ setErrMsg });
      res1 && setVidList(res1);
    }
  };
  return (
    <div>
      Groups
      {errMsg && <p>{errMsg}</p>}
      <ol>
        {vidList?.result.map((vid) => (
          <li key={vid.id}>
            {vid.post}
            <button onClick={() => handleDelete(vid.id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
