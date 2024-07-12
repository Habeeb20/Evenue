import { baseURL } from "../global/urls";

async function increaseViewFn({ video_id }: { video_id: number }) {
  const url = `${baseURL}/shortVideos/increaseView`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_id,
    }),
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    console.log(errorMsg);

    // Set the error message in the state

    // Throw an error to stop further execution
    return;
  }

  const data = await res.json();

  return data;
}

export default increaseViewFn;
