import { baseURL } from "../global/urls";
import Cookies from "js-cookie";

export interface Welcome64 {
  result: Result[];
}

export interface Result {
  id: number;
  comment: string;
}

async function getGroupPostCommentsListFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Welcome64 | undefined> {
  const url = `${baseURL}/admin/groupPostCommentList`;
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

  const data = await res.json();
  console.log({ data });

  return data;
}

export default getGroupPostCommentsListFn;
