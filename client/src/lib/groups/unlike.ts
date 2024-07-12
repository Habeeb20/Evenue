import Cookies from "js-cookie";
import { Res4UnLike } from "../../typesAndInterfaces/groups.ts/res4Unlike";
import { baseURL } from "../global/urls";

async function unlikePostFn({
  group_post_id,
  setErrMsg,
}: {
  group_post_id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4UnLike | undefined> {
  const url = `${baseURL}/groups/unlike/${group_post_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
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

  const data: Res4UnLike = await res.json();

  return data;
}

export default unlikePostFn;
