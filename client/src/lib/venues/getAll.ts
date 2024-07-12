import { VenueResponse } from "../../typesAndInterfaces/venues/getAll";
import { baseURL } from "../global/urls";

type Props = {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
} & (
  | {
      categoryIdentifier: string;
      popularIdentifier?: never;
      blacklistIdentifier?: never;
      locationIdentifier?: never;
    }
  | {
      popularIdentifier: string;
      categoryIdentifier?: never;
      blacklistIdentifier?: never;
      locationIdentifier?: never;
    }
  | {
      blacklistIdentifier: string;
      categoryIdentifier?: never;
      popularIdentifier?: never;
      locationIdentifier?: never;
    }
  | {
      locationIdentifier: string;
      blacklistIdentifier?: never;
      categoryIdentifier?: never;
      popularIdentifier?: never;
    }
);

async function getAllVenuesFn({
  categoryIdentifier,
  popularIdentifier,
  blacklistIdentifier,
  locationIdentifier,
  setErrMsg,
}: Props): Promise<VenueResponse> {
  const url = `${baseURL}/venues/getAll`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryIdentifier,
      popularIdentifier,
      blacklistIdentifier,
      locationIdentifier,
    }),
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;
    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    throw new Error("new error");
  }

  const data: VenueResponse = await res.json();
  console.log({ data: data });

  return data;
}

export default getAllVenuesFn;
