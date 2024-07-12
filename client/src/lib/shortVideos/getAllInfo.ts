import { GetVidsAllRes } from "../../typesAndInterfaces/shortVideos/getAllInfo";
import { baseURL } from "../global/urls";

async function getShortVideosAllFn({
  video_id,
  setErrMsg,
}: {
  video_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<GetVidsAllRes | undefined> {
  const url = `${baseURL}/shortVideos/getAllInfo?video_id=${video_id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

  const data: GetVidsAllRes = await res.json();

  return data;
}

export default getShortVideosAllFn;
