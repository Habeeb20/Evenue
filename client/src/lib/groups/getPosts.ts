import Cookies from "js-cookie";
import { Res4GetPost } from "../../typesAndInterfaces/groups.ts/res4GetPosts";
import { baseURL } from "../global/urls";

async function getPostsFn({
  group_id,
  setErrMsg,
}: {
  group_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4GetPost | undefined> {
  const url = `${baseURL}/groups/getPosts/${group_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: Res4GetPost = await res.json();

  return data;
}

export default getPostsFn;
