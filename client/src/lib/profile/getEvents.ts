import Cookies from "js-cookie";
import { EventProfileLRes } from "../../typesAndInterfaces/profile/getLimitedInfo";
import { baseURL } from "../global/urls";

async function getEventProfileFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<EventProfileLRes | undefined> {
  const url = `${baseURL}/users/getLimitedInfoProfile`;

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
    return;
  }

  const data: EventProfileLRes = await res.json();

  return data;
}

export default getEventProfileFn;
