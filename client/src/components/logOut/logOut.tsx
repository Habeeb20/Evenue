import { Link } from "react-router-dom";
import logOutFn from "../../lib/users/logOut";
import { useState } from "react";
import { InlineErrMsg } from "../global/inlineErrMsg";

export const LogOut = ({
  firstName,
  setTokenState,
  autoCloseNavMobile,
}: {
  firstName: string;
  setTokenState: React.Dispatch<React.SetStateAction<boolean>>;
  autoCloseNavMobile: () => void;
}) => {
  const [errMsg, setErrMsg] = useState("");

  async function handleLogOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await logOutFn({ setErrMsg });
    if (res && res.message.includes("success")) {
      setTokenState(false);
      autoCloseNavMobile();
    }
  }
  return (
    <>
      <p>Hi {firstName}</p>
      <Link to="/profile" style={{ padding: "0 0.5rem", marginLeft: "0.5rem" }}>
        {firstName.substring(0, 1)}
      </Link>
      <button onClick={handleLogOut}>Log out</button>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
    </>
  );
};
