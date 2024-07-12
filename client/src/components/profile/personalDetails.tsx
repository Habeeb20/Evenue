import { useState } from "react";
import stylesDetails from "../../components/profile/styles/personalDetailsFY8.module.css";
import { handleInputChange } from "../global/handleInputChange";
import { UpdateImg } from "../../typesAndInterfaces/profile/updateImg";
import updateProfileImgFn from "../../lib/profile/updateImg";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import { ProfileRes } from "../../typesAndInterfaces/profile/getProfile";

type Props = {
  showProfile: boolean;
  handleShowProfile: (e: React.MouseEvent) => void;
  handleShowEdit: (e: React.MouseEvent) => void;
  first_name: string;
  last_name: string;
  phone_number: string;
  country_code: string;
  email: string;
  profileRes: ProfileRes;
  setProfileRes: React.Dispatch<React.SetStateAction<ProfileRes | undefined>>;
  getProfileFn: ({
    setErrMsg,
  }: {
    setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  }) => Promise<ProfileRes | undefined>;
  setErrMsgs: React.Dispatch<React.SetStateAction<string>>;
};

export const PersonalDetails = ({
  showProfile,
  handleShowEdit,
  handleShowProfile,
  first_name,
  last_name,
  phone_number,
  country_code,
  email,
  profileRes,
  getProfileFn,
  setProfileRes,
  setErrMsgs,
}: Props) => {
  const [formDetails, setFormDetails] = useState<UpdateImg>({
    img: "",
  });
  const [errMsg, setErrMsg] = useState("");
  // Temporary state. To be moved to a global component based on successful implementation
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataBody = new FormData();

    for (const key in formDetails) {
      if (key === "img") {
        const value = formDetails[key];
        if (value instanceof FileList) {
          const fileList = value as FileList;
          for (let i = 0; i < fileList.length; i++) {
            formDataBody.append(key, fileList[i]);
          }
        } else if (typeof value === "string") {
          formDataBody.append(key, value);
        }
      } else {
        formDataBody.append(key, String(formDetails[key]));
      }
    }

    try {
      updateProfileImgFn({
        formDataBody,
        setErrMsg,
      }).then((data) => {
        setSuccessMsg(data.message);
        getProfileFn({ setErrMsg: setErrMsgs }).then((res) => {
          res && setProfileRes(res);
        });
        // reset the form to empty
      });
    } catch (error) {}
  }
  return (
    <>
      <div>
        <button
          onClick={handleShowProfile}
          className={
            showProfile ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          My profile
        </button>
        <button
          onClick={handleShowEdit}
          className={
            !showProfile ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          Edit profile
        </button>
      </div>
      <div>
        <h4>Personal Details</h4>
        <button onClick={handleShowEdit}>Edit profile</button>
      </div>
      <div className={stylesDetails.profileList}>
        <p>{first_name + " " + last_name}</p>
        {phone_number && <p>{phone_number}</p>}
        <p>Dial code: {country_code}</p>
        <p>{email}</p>
      </div>
      <div className={stylesDetails.imgIcon}>
        <img src="/home/Group.svg" alt="icon" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="img" hidden></label>
        <input
          type="file"
          name="img"
          id="img"
          onChange={(e) => handleInputChange(e, setFormDetails)}
          required
          aria-required
        />
        <button>Change Photo</button>
      </form>
      {errMsg && (
        <>
          <InlineErrMsg errMsg={errMsg} />
        </>
      )}
      {successMsg && (
        <>
          <InlineSuccessMsg successMsg={successMsg} />
        </>
      )}
    </>
  );
};
