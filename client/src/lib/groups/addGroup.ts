import Cookies from "js-cookie";
import { Res4AddGroup } from "../../typesAndInterfaces/groups.ts/res4AddGroup";
import { baseURL } from "../global/urls";

async function addGroupFn({
  formDataBody,
  setErrMsg,
}: {
  formDataBody: FormData;

  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4AddGroup | undefined> {
  const url = `${baseURL}/groups`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataBody,
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

  const data: Res4AddGroup = await res.json();

  return data;
}

export default addGroupFn;
