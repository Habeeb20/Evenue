import Cookies from "js-cookie";
import { baseURL } from "../global/urls";

async function updatePostViewsFn({ group_post_id }: { group_post_id: number }) {
  const url = `${baseURL}/groups/updateViews/${group_post_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
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
    // setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data = await res.json();

  return data;
}

export default updatePostViewsFn;
