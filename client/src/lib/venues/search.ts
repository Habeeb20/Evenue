import { Res4VenueSearch } from "../../typesAndInterfaces/venues/res4Search";
import { baseURL } from "../global/urls";

async function searchVenueFn({
  category,
  location,
  no_of_guest,
  venue_type,
  space_preference,
  rating,
  setErrMsg,
}: {
  category: string;
  location: string;
  no_of_guest: string;
  venue_type: string;
  space_preference: string;
  rating: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4VenueSearch | undefined> {
  const url = `${baseURL}/venues/search?rating=${rating}&no_of_guest=${no_of_guest}&category=${category}&venue_type=${venue_type}&space_preference=${space_preference}&location=${location}`;

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

  const data: Res4VenueSearch = await res.json();
  console.log({ data });

  return data;
}

export default searchVenueFn;
