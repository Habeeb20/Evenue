import { useState } from "react";
import { AddGroupPostFD } from "../../typesAndInterfaces/groups.ts/addGroupPost";
import styles from "./styles/post64H.module.css";
import { handleInputChange } from "../global/handleInputChange";
import addPostFn from "../../lib/groups/addPost";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import Cookies from "js-cookie";
import { LoginNotice } from "../global/loginNotice";

export const AddPosts = ({ group_id }: { group_id: string }) => {
  const [formDetails, setFormDetails] = useState<AddGroupPostFD>({
    post: "",
    imgs: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showLoginErr, setShowLoginErr] = useState(false);
  const token = Cookies.get("token");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setShowLoginErr(true);
      setTimeout(() => {
        setShowLoginErr(false);
      }, 10000);
      return;
    }

    const formDataBody = new FormData();
    for (const key in formDetails) {
      if (key === "imgs") {
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

    // append states of external packages
    formDataBody.append("fk_egroup_id", group_id);
    try {
      const res = await addPostFn({ formDataBody, setErrMsg });
      if (res && res.message.includes("successfully")) {
        setSuccessMsg(res.message);
      }
      //TODO: Go to the event page

      // reset the form
      setFormDetails({
        post: "",
        imgs: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container64H}>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="post"></label>
            <input
              type="text"
              name="post"
              id="post"
              placeholder="Write Something..."
              onChange={(e) => handleInputChange(e, setFormDetails)}
              value={formDetails.post}
              required
              aria-required
            />
          </div>
          <div>
            <div>
              <label htmlFor="imgs"></label>
              <input
                type="file"
                name="imgs"
                id="imgs"
                onChange={(e) => handleInputChange(e, setFormDetails)}
                multiple
              />
            </div>
            <div>
              {" "}
              <button>Post</button>
            </div>
          </div>
        </form>
        {showLoginErr && <LoginNotice />}
      </section>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </div>
  );
};
