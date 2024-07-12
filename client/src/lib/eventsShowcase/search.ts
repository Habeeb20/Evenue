import { GetLimitedInfoForAllResponse } from "../../typesAndInterfaces/eventServices/getLimitedInfoForAll";
import { baseURL } from "../global/urls";

async function eventServicesSearchFn({
  category,
  location,
  setErrMsg,
}: {
  category: string;
  location: string;

  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<GetLimitedInfoForAllResponse | undefined> {
  const url = `${baseURL}/eventServices/search?category=${category}&location=${location}`;

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

  const data: GetLimitedInfoForAllResponse = await res.json();

  return data;
}

export default eventServicesSearchFn;
