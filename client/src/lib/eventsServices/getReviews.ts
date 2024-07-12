import { Res4ServiceReviews } from "../../typesAndInterfaces/eventServices/res4Reviews";
import { baseURL } from "../global/urls";

async function getServiceReviewsFn({
  sProvider_id,
  setErrMsg,
}: {
  sProvider_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4ServiceReviews | undefined> {
  const url = `${baseURL}/eventServices/getReviews/${sProvider_id}`;

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

  const data: Res4ServiceReviews = await res.json();

  return data;
}

export default getServiceReviewsFn;
