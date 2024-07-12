import { baseURL } from "../global/urls";

async function signUpFn({
  first_name,
  last_name,
  email,
  password,
  setErrMsg,
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const url = `${baseURL}/users`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    }),
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

export default signUpFn;
