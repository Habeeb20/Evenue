import { ResEventServiceFUInfo } from "../../typesAndInterfaces/eventServices/getFUInfo";
import { baseURL } from "../global/urls";

async function getEServiceFUInfoFn({
  sProvider_id,
  setErrMsg,
}: {
  sProvider_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResEventServiceFUInfo | undefined> {
  const url = `${baseURL}/eventServices/getServiceProvider/${sProvider_id}`;

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

  const data: ResEventServiceFUInfo = await res.json();

  return data;
}

export default getEServiceFUInfoFn;
