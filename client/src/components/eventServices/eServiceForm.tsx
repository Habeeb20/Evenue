import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handleInputChange } from "../global/handleInputChange";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import uploadEServiceFn from "../../lib/eventsServices/upload";
import { AddEServiceFD } from "../../typesAndInterfaces/eventServices/addEServiceFD";
import styles from "../event/styles/createEvent83D.module.css";

export const CreateServiceForm = () => {
  const [formDetails, setFormDetails] = useState<AddEServiceFD>({
    name: "",
    location: "",
    profession: "",
    category: "",
    email: "",
    phone_number: "",
    experience_duration: "",
    imgs: "",
    MONDAY_OPEN: "",
    MONDAY_CLOSE: "",
    TUESDAY_OPEN: "",
    TUESDAY_CLOSE: "",
    WEDNESDAY_OPEN: "",
    WEDNESDAY_CLOSE: "",
    THURSDAY_OPEN: "",
    THURSDAY_CLOSE: "",
    FRIDAY_OPEN: "",
    FRIDAY_CLOSE: "",
    SATURDAY_OPEN: "",
    SATURDAY_CLOSE: "",
    SUNDAY_OPEN: "",
    SUNDAY_CLOSE: "",
  });

  const [bio, setBio] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
    formDataBody.append("bio", bio);
    try {
      setIsSubmitting(true);
      const res = await uploadEServiceFn({ formDataBody, setErrMsg });
      if (res?.message.includes("success")) {
        setSuccessMsg(res.message);
      }
      setIsSubmitting(false);
      //TODO: Go to the E Service page

      // reset the form
      setFormDetails({
        name: "",
        location: "",
        profession: "",
        category: "",
        email: "",
        phone_number: "",
        experience_duration: "",
        imgs: "",
        MONDAY_OPEN: "",
        MONDAY_CLOSE: "",
        TUESDAY_OPEN: "",
        TUESDAY_CLOSE: "",
        WEDNESDAY_OPEN: "",
        WEDNESDAY_CLOSE: "",
        THURSDAY_OPEN: "",
        THURSDAY_CLOSE: "",
        FRIDAY_OPEN: "",
        FRIDAY_CLOSE: "",
        SATURDAY_OPEN: "",
        SATURDAY_CLOSE: "",
        SUNDAY_OPEN: "",
        SUNDAY_CLOSE: "",
      });
      setBio("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container83D}>
      <form onSubmit={handleSubmit}>
        <h3>Create Service</h3>
        <div>
          <label htmlFor="name">Service Name</label>
          <input
            id="name"
            name="name"
            required
            aria-required
            type="text"
            value={formDetails.name}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="profession">Profession</label>
          <input
            id="profession"
            name="profession"
            required
            aria-required
            type="text"
            value={formDetails.profession}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="bio">Describe your Service</label>
          <section className={styles.quillDiv}>
            <ReactQuill
              theme="snow"
              value={bio}
              onChange={setBio}
              className={styles.quill}
            />
          </section>
        </div>
        <div>
          <label htmlFor="location">Location of your service</label>
          <input
            id="location"
            name="location"
            required
            aria-required
            type="text"
            value={formDetails.location}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="category">What kind of service is it?</label>
          <select
            name="category"
            id="category"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.category}
            required
            aria-required
          >
            <option value="">--Please choose an option--</option>
            <option value="make_up_artise">Make Up Artise</option>
            <option value="photography/videography">
              Photography/Videography
            </option>
            <option value="designers">Designers</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience_duration">End date</label>
          <input
            type="date"
            id="experience_duration"
            name="experience_duration"
            value={formDetails.experience_duration.toString()}
            onChange={(e) => handleInputChange(e, setFormDetails)}
            required
            aria-required
          />
        </div>
        <div>
          <label htmlFor="imgs">Service Photos</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleInputChange(e, setFormDetails)}
            name="imgs"
            id="imgs"
            required
            aria-required
            accept="image/jpg, image/jpeg, image/png, image/svg, image/webp, image/avif"
          />
        </div>
        <div>
          <label htmlFor="email">Service Email</label>
          <input
            id="email"
            name="email"
            required
            aria-required
            type="email"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.email}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            id="phone_number"
            name="phone_number"
            required
            aria-required
            type="tel"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.phone_number}
            maxLength={11}
          />
        </div>
        <h4>Opening hours</h4>
        <section>
          <div>
            <label htmlFor="MONDAY_OPEN">Monday Open</label>
            <input
              type="time"
              id="MONDAY_OPEN"
              name="MONDAY_OPEN"
              value={formDetails.MONDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor=".MONDAY_CLOSE">Monday Close</label>
            <input
              type="time"
              id=".MONDAY_CLOSE"
              name=".MONDAY_CLOSE"
              value={formDetails.MONDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="TUESDAY_OPEN">Tuesday Open</label>
            <input
              type="time"
              id="TUESDAY_OPEN"
              name="TUESDAY_OPEN"
              value={formDetails.TUESDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="TUESDAY_CLOSE">Tuesday Close</label>
            <input
              type="time"
              id="TUESDAY_CLOSE"
              name="TUESDAY_CLOSE"
              value={formDetails.TUESDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="WEDNESDAY_OPEN">Wednesday Open</label>
            <input
              type="time"
              id="WEDNESDAY_OPEN"
              name="WEDNESDAY_OPEN"
              value={formDetails.WEDNESDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="WEDNESDAY_CLOSE">Wednesday Close</label>
            <input
              type="time"
              id="WEDNESDAY_CLOSE"
              name="WEDNESDAY_CLOSE"
              value={formDetails.WEDNESDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="THURSDAY_OPEN">Thursday Open</label>
            <input
              type="time"
              id="THURSDAY_OPEN"
              name="THURSDAY_OPEN"
              value={formDetails.THURSDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="THURSDAY_CLOSE">Thursday Close</label>
            <input
              type="time"
              id="THURSDAY_CLOSE"
              name="THURSDAY_CLOSE"
              value={formDetails.THURSDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="FRIDAY_OPEN">Friday Open</label>
            <input
              type="time"
              id="FRIDAY_OPEN"
              name="FRIDAY_OPEN"
              value={formDetails.FRIDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="FRIDAY_CLOSE">Friday Close</label>
            <input
              type="time"
              id="FRIDAY_CLOSE"
              name="FRIDAY_CLOSE"
              value={formDetails.FRIDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="SATURDAY_OPEN">Saturday Open</label>
            <input
              type="time"
              id="SATURDAY_OPEN"
              name="SATURDAY_OPEN"
              value={formDetails.SATURDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="SATURDAY_CLOSE">Saturday Close</label>
            <input
              type="time"
              id="SATURDAY_CLOSE"
              name="SATURDAY_CLOSE"
              value={formDetails.SATURDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="SUNDAY_OPEN">Sunday Open</label>
            <input
              type="time"
              id="SUNDAY_OPEN"
              name="SUNDAY_OPEN"
              value={formDetails.SUNDAY_OPEN?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="SUNDAY_CLOSE">Sunday Close</label>
            <input
              type="time"
              id="SUNDAY_CLOSE"
              name="SUNDAY_CLOSE"
              value={formDetails.SUNDAY_CLOSE?.toString()}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
        </section>
        <div>
          <input
            type="reset"
            value="Reset"
          />
          {/* button should show loading when submitting */}
          <button type="submit">
            {isSubmitting ? "Submitting..." : "Post"}
          </button>
        </div>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </div>
  );
};
