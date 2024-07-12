import { Response } from "../../typesAndInterfaces/events/getLimitedInfo";
import { baseURL } from "../global/urls";

async function getLimitedInfoByAdminFn({
  category,
  setErrMsg,
}: {
  category: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Response> {
  const url = `${baseURL}/events/q/limitedInfoByAdmin`;

  // body for POST request

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;
    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.error}`
    );
  }

  const data: Response = await res.json();

  return data;
}

export default getLimitedInfoByAdminFn;
