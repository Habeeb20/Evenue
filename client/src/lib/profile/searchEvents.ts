import Cookies from "js-cookie";
import { SearchRes } from "../../typesAndInterfaces/profile/searchEvents";
import { baseURL } from "../global/urls";

async function searchEventsFn({
  name,
  location,
  category,
  frequency,
  price,
  setErrMsg,
}: {
  name: string;
  location: string;
  category: string;
  frequency: string;
  price: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<SearchRes | undefined> {
  const url = `${baseURL}/users/searchEvent?name=${name}&location=${location}&category=${category}&frequency=${frequency}&price=${price}`;

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

  const data: SearchRes = await res.json();
  console.log(data);

  return data;
}

export default searchEventsFn;
