import { Response } from "../../typesAndInterfaces/events/getLimitedInfo";
import { baseURL } from "../global/urls";

async function searchFn({
  name,
  location,
  category,
  setErrMsg,
}: {
  name: string;
  location: string;
  category: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Response> {
  const url = `${baseURL}/events/search?name=${name}&location=${location}&category=${category}`;

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
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.error}`
    );
  }

  const data: Response = await res.json();
  console.log(data);

  return data;
}

export default searchFn;
