import { Res4CountByCategory } from "../../typesAndInterfaces/eventServices/res4CountByCategory";
import { baseURL } from "../global/urls";

async function getCountByCatFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4CountByCategory | undefined> {
  const url = `${baseURL}/eventServices/countByCategory`;

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

  const data: Res4CountByCategory = await res.json();

  return data;
}

export default getCountByCatFn;
