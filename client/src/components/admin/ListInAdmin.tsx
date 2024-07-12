import { useEffect, useState } from "react";
import getUsersFn, { Welcome4 } from "../../lib/admin/getusers";
import deleteUserFn from "../../lib/admin/deleteUser";

export const UserListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [usersList, setusersList] = useState<Welcome4>();
  useEffect(() => {
    (async () => {
      const res = await getUsersFn({ setErrMsg });

      res && setusersList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteUserFn({ setErrMsg, user_id: id.toString() });

    if (res?.message.includes("success")) {
      const res1 = await getUsersFn({ setErrMsg });
      res1 && setusersList(res1);
    }
  };
  return (
    <div>
      Users
      <ul>
        {usersList?.result.map((user) => (
          <li key={user.user_id}>
            {user.first_name} {user.last_name} {user.email}{" "}
            <button onClick={() => handleDelete(user.user_id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
