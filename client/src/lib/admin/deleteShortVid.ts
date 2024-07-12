import { baseURL } from "../global/urls";
import Cookies from "js-cookie";

async function deleteShortVidsFn({
  short_vid_id,
  setErrMsg,
}: {
  short_vid_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<{ message: string } | undefined> {
  const url = `${baseURL}/admin/deleteShortVid/${short_vid_id}`;
  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "DELETE",
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

export default deleteShortVidsFn;
