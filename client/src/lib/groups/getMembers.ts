import { Res4GetGroupMembers } from "../../typesAndInterfaces/groups.ts/res4GetGroupMembers";
import { baseURL } from "../global/urls";

async function getMembersFn({
  group_id,
  setErrMsg,
}: {
  group_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4GetGroupMembers | undefined> {
  const url = `${baseURL}/groups/getMembers/${group_id}`;

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

  const data: Res4GetGroupMembers = await res.json();

  return data;
}

export default getMembersFn;
