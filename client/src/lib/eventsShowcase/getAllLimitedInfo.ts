import { EventShowcaseResponse } from "../../typesAndInterfaces/eventShowcase/getAllLimitedInfo";
import { baseURL } from "../global/urls";

async function getLimitedInfoForAllFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<EventShowcaseResponse | undefined> {
  const url = `${baseURL}/eventsShowcase/getLimitedInfo`;

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

  const data: EventShowcaseResponse = await res.json();

  return data;
}

export default getLimitedInfoForAllFn;
