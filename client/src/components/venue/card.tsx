import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useState } from "react";
import { VenueFullInfo } from "../../typesAndInterfaces/venues/getVenue";
import styles from "../event/styles/card.module.css";
import { Share } from "../global/share";
import { PopUp } from "../payment/popUp";
import { baseURL } from "../../lib/global/urls";

export const Card = (props: VenueFullInfo) => {
  const [showShare, setShowShare] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const handleShowShare = () => {
    setShowShare((prev) => !prev);
  };

  const togglePayment = () => {
    setShowPayment((prev) => !prev);
  };

  const sanitizedContent = DOMPurify.sanitize(props.description, {
    ALLOWED_TAGS: ["p", "strong", "u", "br"],
    USE_PROFILES: {
      html: true,
    },
  });

  // check if props.opening_hours is an array
  const hasOpeningHours = Array.isArray(props.opening_hours);

  return (
    <div className={styles.card0OV}>
      {showPayment && (
        <PopUp
          name={props.title}
          price={props.starting_price}
          email={props.vEmail}
          setShowPayment={setShowPayment}
        />
      )}
      <div className={styles.imgDetailsArea}>
        <section className={styles.imgsArea}>
          <div>
            {props.imgs.split(",")[0] && (
              <img
                src={props.imgs.split(",")[0]}
                alt={"Photo of " + props.title}
              />
            )}
          </div>
          <div>
            {props.imgs.split(",")[1] && (
              <img
                src={props.imgs.split(",")[1]}
                alt={"Photo of " + props.title}
              />
            )}
            {props.imgs.split(",")[2] && (
              <img
                src={props.imgs.split(",")[2]}
                alt={"Photo of " + props.title}
              />
            )}
            {props.imgs.split(",")[3] && (
              <img
                src={props.imgs.split(",")[3]}
                alt={"Photo of " + props.title}
              />
            )}
            {props.imgs.split(",")[4] && (
              <img
                src={props.imgs.split(",")[4]}
                alt={"Photo of " + props.title}
              />
            )}
          </div>
        </section>
      </div>
      <section className={styles.cTAArea}>
        <button onClick={togglePayment} className={styles.cTA}>
          Book venue
        </button>{" "}
        <button onClick={handleShowShare}>
          <img src="/home/material-symbols_share.svg" alt="share icon" />
          share
        </button>
        {showShare && (
          <Share
            uRL={`${baseURL}/venue/${props.id}`}
            title={props.title}
            hashtag={`#${props.title.split(" ").join("_")}`}
            summary={props.description.slice(0, 40) + "..."}
            source="https://evenue.ng"
          />
        )}
      </section>
      <section>{/* <h4>Google map to location here</h4> */}</section>
      <h3>Description</h3>
      <section>{parse(sanitizedContent)}</section>
      <section className={styles.venueDetailsAreas}>
        {hasOpeningHours && (
          <div>
            <h3>Opening hours</h3>
            {props.opening_hours?.map((day) => (
              <div key={day.hours_id} className={styles.openingHours}>
                {day.MONDAY_OPEN &&
                  day.MONDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.MONDAY_CLOSE &&
                  day.MONDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Mon</div>{" "}
                      <div>
                        <p>
                          {day.MONDAY_OPEN.slice(0, 5)} -{" "}
                          {day.MONDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
                {day.TUESDAY_OPEN &&
                  day.TUESDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.TUESDAY_CLOSE &&
                  day.TUESDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Tue</div>{" "}
                      <div>
                        <p>
                          {day.TUESDAY_OPEN.slice(0, 5)} -{" "}
                          {day.TUESDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
                {day.WEDNESDAY_OPEN &&
                  day.WEDNESDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.WEDNESDAY_CLOSE &&
                  day.WEDNESDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Wed</div>{" "}
                      <div>
                        <p>
                          {day.WEDNESDAY_OPEN.slice(0, 5)} -{" "}
                          {day.WEDNESDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
                {day.THURSDAY_OPEN &&
                  day.THURSDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.THURSDAY_CLOSE &&
                  day.THURSDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Thu</div>{" "}
                      <div>
                        <p>
                          {day.THURSDAY_OPEN.slice(0, 5)} -{" "}
                          {day.THURSDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
                {day.FRIDAY_OPEN &&
                  day.FRIDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.FRIDAY_CLOSE &&
                  day.FRIDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Fri</div>{" "}
                      <div>
                        <p>
                          {day.FRIDAY_OPEN.slice(0, 5)} -{" "}
                          {day.FRIDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
                {day.SATURDAY_OPEN &&
                  day.SATURDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.SATURDAY_CLOSE &&
                  day.SATURDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Sat</div>{" "}
                      <div>
                        <p>
                          {day.SATURDAY_OPEN.slice(0, 5)} -{" "}
                          {day.SATURDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
                {day.SUNDAY_OPEN &&
                  day.SUNDAY_OPEN.substring(0, 5) !== "00:00" &&
                  day.SUNDAY_CLOSE &&
                  day.SUNDAY_CLOSE.substring(0, 5) !== "00:00" && (
                    <div>
                      <div>Sun</div>{" "}
                      <div>
                        <p>
                          {day.SUNDAY_OPEN.slice(0, 5)} -{" "}
                          {day.SUNDAY_CLOSE.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
        <div className={styles.venueDetails}>
          <table>
            <thead>
              <tr>
                <th>Venue Type</th>
                <th>Seating</th>
                <th>Starting Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.venue_type}</td>
                <td>{props.seating.toLocaleString()}</td>
                <td>{props.starting_price.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div>
            <h4>Contact Info</h4>
            <p>
              <img src="/home/basil_location-outline.svg" alt="location" />
              {props.location}
            </p>
            <p>
              <img src="/home/ic_round-mail.svg" alt="email" />
              {props.vEmail}
            </p>
            <p>
              <img src="/home/gg_phone.svg" alt="phone" />
              {props.vPhone}
            </p>
          </div>
        </div>
      </section>
      {props.imgs.split(",")[1] && (
        <>
          <h3>More Photos</h3>
          <section className={styles.imgsArea2}>
            <div>
              {props.imgs.split(",")[0] && (
                <img
                  src={props.imgs.split(",")[0]}
                  alt={"Photo of " + props.title}
                />
              )}
            </div>

            <div>
              {props.imgs.split(",")[1] && (
                <img
                  src={props.imgs.split(",")[1]}
                  alt={"Photo of " + props.title}
                />
              )}
            </div>
            <div>
              {props.imgs.split(",")[2] && (
                <img
                  src={props.imgs.split(",")[2]}
                  alt={"Photo of " + props.title}
                />
              )}
            </div>
            <div>
              {props.imgs.split(",")[3] && (
                <img
                  src={props.imgs.split(",")[3]}
                  alt={"Photo of " + props.title}
                />
              )}
            </div>
            <div>
              {props.imgs.split(",")[4] && (
                <img
                  src={props.imgs.split(",")[4]}
                  alt={"Photo of " + props.title}
                />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
