import Cookies from "js-cookie";
import { Res4AddedLike } from "../../typesAndInterfaces/shortVideos/res4AddedLike";
import { baseURL } from "../global/urls";

async function addLikeFn({
  video_id,
  setErrMsg,
}: {
  video_id: number;

  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4AddedLike | undefined> {
  const url = `${baseURL}/shortVideos/addLike`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      video_id,
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

  const data: Res4AddedLike = await res.json();

  return data;
}

export default addLikeFn;
