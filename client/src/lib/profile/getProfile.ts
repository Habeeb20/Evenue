import Cookies from "js-cookie";
import { ProfileRes } from "../../typesAndInterfaces/profile/getProfile";
import { baseURL } from "../global/urls";

async function getProfileFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ProfileRes | undefined> {
  const url = `${baseURL}/users/getProfile`;

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

  const data: ProfileRes = await res.json();

  return data;
}

export default getProfileFn;
