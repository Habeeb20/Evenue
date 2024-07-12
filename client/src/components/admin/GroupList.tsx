import { useEffect, useState } from "react";
import deleteGroupFn from "../../lib/admin/deleteGroup";
import getGroupListFn, { Welcome62 } from "../../lib/admin/getGroupList";

export const GroupListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [vidList, setVidList] = useState<Welcome62>();
  useEffect(() => {
    (async () => {
      const res = await getGroupListFn({ setErrMsg });

      res && setVidList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteGroupFn({
      setErrMsg,
      group_id: id.toString(),
    });

    if (res?.message.includes("success")) {
      const res1 = await getGroupListFn({ setErrMsg });
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
            {vid.name}
            <button onClick={() => handleDelete(vid.id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
