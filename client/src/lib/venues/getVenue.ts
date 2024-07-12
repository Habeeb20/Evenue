import { VenueFullInfoResponse } from "../../typesAndInterfaces/venues/getVenue";
import { baseURL } from "../global/urls";

async function getVenueFn({
  venue_id,
  setErrMsg,
}: {
  venue_id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<VenueFullInfoResponse | undefined> {
  const url = `${baseURL}/venues/${venue_id}`;

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

  const data: VenueFullInfoResponse = await res.json();

  return data;
}

export default getVenueFn;
