import { Res4AllStories } from "../../typesAndInterfaces/stories/res4AllStories";
import { baseURL } from "../global/urls";

async function getAllStoryFn({
  story_id,
  setErrMsg,
}: {
  story_id?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4AllStories | undefined> {
  let url;

  if (story_id) {
    url = `${baseURL}/story/getAllInfo?story_id=${story_id}`;
  } else {
    url = "${baseURL}/story/getAllInfo";
  }

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

  const data: Res4AllStories = await res.json();

  return data;
}

export default getAllStoryFn;
