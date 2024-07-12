import Cookies from "js-cookie";
import { AddedCommentRes } from "../../typesAndInterfaces/shortVideos/res4AddedComment";
import { baseURL } from "../global/urls";

async function addCommentFn({
  video_id,
  comment,
  setErrMsg,
}: {
  video_id: number;
  comment: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<AddedCommentRes | undefined> {
  const url = `${baseURL}/shortVideos/addComment`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      video_id,
      comment,
    }),
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

  const data: AddedCommentRes = await res.json();

  return data;
}

export default addCommentFn;
