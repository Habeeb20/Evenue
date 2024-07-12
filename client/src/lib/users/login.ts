import Cookies from "js-cookie";
import { Res4LogIn } from "../../typesAndInterfaces/users/logIn";
import { baseURL } from "../global/urls";

async function loginFn({
  email,
  password,
  setErrMsg,
}: {
  email: string;
  password: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4LogIn | undefined> {
  const url = `${baseURL}/users/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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

  const data: Res4LogIn = await res.json();

  // set the token in the cookie
  Cookies.set("token", data.token, {
    sameSite: "strict",
    secure: true,
  });

  return data;
}

export default loginFn;
