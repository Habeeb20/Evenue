import { useEffect, useState } from "react";
import { LogOut } from "./logOut";
import getProfileFn from "../../lib/profile/getProfile";
import { ProfileRes } from "../../typesAndInterfaces/profile/getProfile";
import { ErrMsg } from "../global/errMsg";
import styles from "./styles/parentXJ2.module.css";

export const Parent = ({
  setTokenState,
  autoCloseNavMobile,
}: {
  setTokenState: React.Dispatch<React.SetStateAction<boolean>>;
  autoCloseNavMobile: () => void;
}) => {
  const [profileRes, setProfileRes] = useState<ProfileRes>();
  const [errMsg, setErrMsg] = useState("");

  // API call to get firstname
  useEffect(() => {
    try {
      getProfileFn({ setErrMsg }).then((res) => {
        res && setProfileRes(res);
      });
    } catch (error) {}
  }, []);

  // get first_name from profileRes
  const firstName = profileRes?.profile.filter((item) => item.first_name);
  return (
    <div className={styles.containerXJ2}>
      <LogOut
        firstName={firstName?.[0].first_name || ""}
        setTokenState={setTokenState}
        autoCloseNavMobile={autoCloseNavMobile}
      />
      {errMsg && <ErrMsg errMsg={errMsg} />}
    </div>
  );
};
