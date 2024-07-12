import Cookies from "js-cookie";
import { baseURL } from "../global/urls";

async function addReviewFn({
  event_service_id,
  rating,
  review,
  setErrMsg,
}: {
  event_service_id: string;
  rating: string;
  review: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<{ message: string } | undefined> {
  const url = `${baseURL}/eventServices/addReview?event_service_id=${event_service_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating, review }),
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

  const data = await res.json();

  return data;
}

export default addReviewFn;
