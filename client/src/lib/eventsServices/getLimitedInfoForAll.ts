import { GetLimitedInfoForAllResponse } from "../../typesAndInterfaces/eventServices/getLimitedInfoForAll";
import { baseURL } from "../global/urls";

async function getLimitedInfoForAllFn({
  category,
  setErrMsg,
}: {
  category?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<GetLimitedInfoForAllResponse | undefined> {
  let url: string;

  if (!category) {
    url = `${baseURL}/eventServices/getLimitedInfoForAll`;
  } else {
    url = `${baseURL}/eventServices/getLimitedInfoForAll?category=${category}`;
  }

  const res = await fetch(url, {
    method: "POST",
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

  const data: GetLimitedInfoForAllResponse = await res.json();

  return data;
}

export default getLimitedInfoForAllFn;
