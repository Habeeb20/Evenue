import Cookies from "js-cookie";
import { VenuesRes } from "../../typesAndInterfaces/profile/searchVenues";
import { baseURL } from "../global/urls";

async function searchVenuesFn({
  title,
  location,
  category,
  venue_type,
  starting_price,
  setErrMsg,
}: {
  title: string;
  location: string;
  category: string;
  venue_type: string;
  starting_price: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<VenuesRes | undefined> {
  const url = `${baseURL}/users/searchVenues?title=${title}&location=${location}&category=${category}&venue_type=${venue_type}&starting_price=${starting_price}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "GET",
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
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.error}`
    );
  }

  const data: VenuesRes = await res.json();
  console.log(data);

  return data;
}

export default searchVenuesFn;
