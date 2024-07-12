import { Res4GetListLInfo } from "../../typesAndInterfaces/groups.ts/res4GetListLInfo";
import { baseURL } from "../global/urls";

async function addSearchFn({
  group_name,
  setErrMsg,
}: {
  group_name: string;

  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4GetListLInfo | undefined> {
  const url = `${baseURL}/groups/searchGroup/search?group_name=${group_name}`;

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

  const data: Res4GetListLInfo = await res.json();

  return data;
}

export default addSearchFn;
