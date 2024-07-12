import { Res4Locations } from "../../typesAndInterfaces/venues/getLocationCount";
import { baseURL } from "../global/urls";

async function getLocationsFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4Locations | undefined> {
  const url = `${baseURL}/venues/loc/getLocationCount`;

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

  const data: Res4Locations = await res.json();

  return data;
}

export default getLocationsFn;
