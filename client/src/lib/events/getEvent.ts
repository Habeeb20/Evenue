import { Response } from "../../typesAndInterfaces/events/getEvent";
import { baseURL } from "../global/urls";

async function getEventFn({
  event_id,
  setErrMsg,
}: {
  event_id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Response | undefined> {
  const url = `${baseURL}/events/${event_id}`;

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

  const data: Response = await res.json();

  return data;
}

export default getEventFn;
