import { baseURL } from "../global/urls";

export interface Res4AuthWorker {
  result: OneAuthWorker[];
}

export interface OneAuthWorker {
  first_name: string;
}

async function authWorkerFn({
  userId,
  setErrMsg,
}: {
  userId: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4AuthWorker | undefined> {
  const url = `${baseURL}/users/authWorker?userId=${userId}`;

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

  const data = await res.json();
  console.log(data);

  return data;
}

export default authWorkerFn;
