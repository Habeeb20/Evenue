import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import createVenueFn from "../../lib/venues/createVenue";
import { CreateVenue } from "../../typesAndInterfaces/venues/create";
import { handleInputChange } from "../global/handleInputChange";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import styles from "../event/styles/createEvent83D.module.css";

export const CreateVenueForm = ({ first_name }: { first_name?: string }) => {
  const [formDetails, setFormDetails] = useState<CreateVenue>({
    title: "",
    category: "",
    furnishing: "",
    select_type: "indoor",
    bathrooms: "",
    imgs: "",
    toilets: "",
    starting_price: "",
    location: "",
    no_of_guest: "",
    venue_type: "",
    vEmail: "",
    vPhone: "",
    space_preference: "",
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

  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
    formDataBody.append("description", description);
    try {
      const res = await createVenueFn({ formDataBody, setErrMsg });
      if (res.message.includes("successfully")) {
        setSuccessMsg(res.message);
      }
      //TODO: Go to the event page

      // reset the form
      setFormDetails({
        title: "",
        category: "",
        furnishing: "",
        select_type: "",
        bathrooms: "",
        imgs: "",
        toilets: "",
        starting_price: "",
        location: "",
        no_of_guest: "",
        venue_type: "",
        vEmail: "",
        vPhone: "",
        space_preference: "",
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={
        first_name
          ? `${styles.container83D} ${styles.smallContainer} `
          : `${styles.container83D} ${styles.bigContainer}`
      }
    >
      <div></div>
      <p></p>
      <div>
        <h2>Hey {first_name ?? "OLuchi"} </h2>
        <p> let's set up your venue...It will only take a few minutes</p>
      </div>
      <h3>Venue details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Name</label>
          <input
            id="title"
            name="title"
            required
            aria-required
            type="text"
            value={formDetails.title}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="description">Describe your event</label>
          <section className={styles.quillDiv}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className={styles.quill}
            />
          </section>
        </div>
        <div>
          <label htmlFor="category">Category </label>
          <select
            id="category"
            name="category"
            required
            aria-required
            value={formDetails.category}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          >
            <option value="null">Category</option>
            <option value="wedding">Wedding</option>
            <option value="academic">Academic</option>
            <option value="boardrooms">Boardroom</option>
            <option value="meetings">Meetings</option>
          </select>
        </div>
        <div>
          <label htmlFor="furnishing">Custom furnishing</label>
          <input
            id="furnishing"
            name="furnishing"
            required
            aria-required
            type="text"
            value={formDetails.furnishing}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="vEmail">Venue Email</label>
          <input
            id="vEmail"
            name="vEmail"
            required
            aria-required
            type="email"
            value={formDetails.vEmail}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="vPhone">Venue Phone</label>
          <input
            id="vPhone"
            name="vPhone"
            required
            aria-required
            type="text"
            value={formDetails.vPhone}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="select_type">Select type</label>
          <select
            name="select_type"
            id="select_type"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.select_type}
            required
            aria-required
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>
        <div>
          <label htmlFor="bathrooms">No. of bathrooms</label>
          <input
            id="bathrooms"
            name="bathrooms"
            required
            aria-required
            type="text"
            value={formDetails.bathrooms}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="toilets">No. of toilets</label>
          <input
            id="toilets"
            name="toilets"
            required
            aria-required
            type="text"
            value={formDetails.toilets}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="starting_price">Starting price</label>
          <input
            id="starting_price"
            name="starting_price"
            required
            aria-required
            type="text"
            value={formDetails.starting_price}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
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
          <label htmlFor="no_of_guest">No of guest</label>
          <input
            id="no_of_guest"
            name="no_of_guest"
            required
            aria-required
            type="text"
            value={formDetails.no_of_guest}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="venue_type">Venue type</label>
          <input
            id="venue_type"
            name="venue_type"
            required
            aria-required
            type="text"
            value={formDetails.venue_type}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="space_preference">Space preference</label>
          <input
            id="space_preference"
            name="space_preference"
            required
            aria-required
            type="text"
            value={formDetails.space_preference}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>

        <div>
          <label htmlFor="imgs">Event Photos</label>
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
            <label htmlFor="MONDAY_CLOSE">Monday Close</label>
            <input
              type="time"
              id="MONDAY_CLOSE"
              name="MONDAY_CLOSE"
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
          <button type="submit">Post</button>
        </div>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </div>
  );
};
