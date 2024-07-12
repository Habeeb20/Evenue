import { useEffect, useState } from "react";
import deleteGroupPostCommentFn from "../../lib/admin/deleteGroupPostComment";
import getGroupPostCommentsListFn, {
  Welcome64,
} from "../../lib/admin/getGroupPostCommentList";

export const GroupPostCommentListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [vidList, setVidList] = useState<Welcome64>();
  useEffect(() => {
    (async () => {
      const res = await getGroupPostCommentsListFn({ setErrMsg });

      res && setVidList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteGroupPostCommentFn({
      setErrMsg,
      group_post_comment_id: id.toString(),
    });

    if (res?.message.includes("success")) {
      const res1 = await getGroupPostCommentsListFn({ setErrMsg });
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
            {vid.comment}
            <button onClick={() => handleDelete(vid.id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
