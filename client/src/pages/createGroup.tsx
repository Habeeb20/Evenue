import { useState } from "react";
import { GroupsFormData } from "../typesAndInterfaces/groups.ts/formData";
import addGroupFn from "../lib/groups/addGroup";
import { InlineErrMsg } from "../components/global/inlineErrMsg";
import { InlineSuccessMsg } from "../components/global/inllineSuccessMsg";
import styles from "./styles/createGroupK3U.module.css";
import { MaxInputLength } from "../components/global/maxInputLength";

export const CreateGroup = () => {
  const [formDetails, setformDetails] = useState<GroupsFormData>({
    name: "",
    about: "",
    logo: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataBody = new FormData();

    for (const key in formDetails) {
      if (key === "logo") {
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
      setIsSubmitting(true);
      addGroupFn({
        formDataBody,
        setErrMsg,
      }).then((data) => {
        if (data?.message.includes("success")) {
          setSuccessMsg(data.message);
        }
        // reset the form to empty
        setformDetails({
          name: "",
          about: "",
          logo: "",
        });
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.formK3U}
      >
        <h3>Create Group</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formDetails.name}
            onChange={(e) => {
              setformDetails({ ...formDetails, name: e.target.value });
            }}
            required
            aria-required
            minLength={3}
            maxLength={250}
          />
          {formDetails.name.length === 250 && <MaxInputLength />}
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            value={formDetails.about}
            onChange={(e) => {
              setformDetails({
                ...formDetails,
                about: e.target.value,
              });
            }}
            required
            aria-required
            minLength={50}
            maxLength={250}
          />
          {formDetails.about.length === 250 && <MaxInputLength />}
        </div>
        <div>
          <label htmlFor="logo"></label>
          <input
            type="file"
            id="logo"
            name="logo"
            multiple
            onChange={(e) => {
              // check if logo is not null
              if (!e.target.files) {
                return;
              }
              setformDetails({
                ...formDetails,
                logo: e.target.files,
              });
            }}
          />
        </div>
        <button>{isSubmitting ? "Submitting..." : "Create Group"}</button>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </>
  );
};
