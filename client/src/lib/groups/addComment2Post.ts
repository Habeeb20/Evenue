import Cookies from "js-cookie";
import { Res4AddedComment } from "../../typesAndInterfaces/groups.ts/res4AddedComment";
import { baseURL } from "../global/urls";

async function addComment2PostFn({
  group_post_id,
  comment,
  setErrMsg,
}: {
  group_post_id: number;
  comment: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4AddedComment | undefined> {
  const url = `${baseURL}/groups/addComment2Post/${group_post_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
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

  const data: Res4AddedComment = await res.json();

  return data;
}

export default addComment2PostFn;
