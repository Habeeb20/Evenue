import { Link } from "react-router-dom";
import { EventProfileLInfo } from "../../typesAndInterfaces/profile/getLimitedInfo";
import styles from "./styles/eventCardOY0.module.css";
import { LoneSearch } from "../../typesAndInterfaces/profile/searchEvents";
import { LoneVenue } from "../../typesAndInterfaces/profile/searchVenues";

export const LimitedInfoCard = (
  props: EventProfileLInfo | LoneSearch | LoneVenue
) => {
  if ("start_date_and_time" in props) {
    return (
      <div className={styles.cardOY0}>
        <Link to={`/events/${props.event_id}`}>
          <div>
            <img
              src={props.first_img}
              alt="event"
            />
          </div>
          <div>
            <div>
              <h4>{props.name}</h4>
              <p>
                <img
                  src="/home/basil_location-outline.svg"
                  alt="location"
                />
                {props.location}
              </p>
            </div>
            <div>
              <div>
                <img
                  src="/home/entypo_price-tag.svg"
                  alt="sale"
                />
                Price
              </div>{" "}
              <div>
                <p>&#8358;{props.price}</p>
              </div>
            </div>
          </div>
          <div>
            <p>
              <img
                src="/home/mdi_interaction-double-tap.svg"
                alt="tap"
              />
              Total interactions
            </p>
            <section>
              <div>
                <div>
                  <img
                    src="/home/lets-icons_view-alt-fill.svg"
                    alt="eye"
                  />{" "}
                  Views
                </div>
                <div>{props.views}</div>
              </div>
              <div>
                <div>
                  <img
                    src="/home/love_shape.svg"
                    alt="love shape"
                  />{" "}
                  Likes
                </div>
                <div>{props.likes}</div>
              </div>
              <div>
                <div>
                  <img
                    src="/home/material-symbols_share-reviews-outline-sharp.svg"
                    alt="share"
                  />{" "}
                  Share
                </div>
                <div>{props.share_count}</div>
              </div>
            </section>
          </div>
        </Link>
      </div> //{/* placeholder to attribute */}
    );
  } else if ("no_of_guest" in props) {
    return (
      <div className={styles.cardOY0}>
        <Link to={`/events/${props.event_id}`}>
          <div>
            <img
              src={props.first_img}
              alt="event"
            />
          </div>
          <div>
            <div>
              <h4>{props.name}</h4>
              <p>
                <img
                  src="/home/basil_location-outline.svg"
                  alt="location"
                />
                {props.location}
              </p>
            </div>
            <div>
              <div>
                <img
                  src="/home/entypo_price-tag.svg"
                  alt="sale"
                />
                Price
              </div>{" "}
              <div>
                <p>&#8358;{props.price}</p>
              </div>
            </div>
          </div>
          <div>
            <p>
              <img
                src="/home/mdi_interaction-double-tap.svg"
                alt="tap"
              />
              Total interactions
            </p>
            <section>
              <div>
                <div>
                  <img
                    src="/home/lets-icons_view-alt-fill.svg"
                    alt="eye"
                  />{" "}
                  Views
                </div>
                <div>{props.views}</div>
              </div>
              <div>
                <div>
                  <img
                    src="/home/love_shape.svg"
                    alt="love shape"
                  />{" "}
                  Likes
                </div>
                <div>{props.likes}</div>
              </div>
              <div>
                <div>
                  <img
                    src="/home/material-symbols_share-reviews-outline-sharp.svg"
                    alt="share"
                  />{" "}
                  Share
                </div>
                <div>{props.share_count}</div>
              </div>
            </section>
          </div>
        </Link>
      </div> //{/* placeholder to attribute */}
    );
  } else {
    return (
      <div className={styles.cardOY0}>
        <Link to={`/events/${props.event_id}`}>
          <div>
            <img
              src={props.first_img}
              alt="event"
            />
          </div>
          <div>
            <div>
              <h4>{props.name}</h4>
              <p>
                <img
                  src="/home/basil_location-outline.svg"
                  alt="location"
                />
                {props.location}
              </p>
            </div>
            <div>
              <div>
                <img
                  src="/home/entypo_price-tag.svg"
                  alt="sale"
                />
                Price
              </div>{" "}
              <div>
                <p>&#8358;{props.price}</p>
              </div>
            </div>
          </div>
          <div>
            <p>
              <img
                src="/home/mdi_interaction-double-tap.svg"
                alt="tap"
              />
              Total interactions
            </p>
            <section>
              <div>
                <div>
                  <img
                    src="/home/lets-icons_view-alt-fill.svg"
                    alt="eye"
                  />{" "}
                  Views
                </div>
                <div>{props.views}</div>
              </div>
              <div>
                <div>
                  <img
                    src="/home/love_shape.svg"
                    alt="love shape"
                  />{" "}
                  Likes
                </div>
                <div>{props.likes}</div>
              </div>
              <div>
                <div>
                  <img
                    src="/home/material-symbols_share-reviews-outline-sharp.svg"
                    alt="share"
                  />{" "}
                  Share
                </div>
                <div>{props.share_count}</div>
              </div>
            </section>
          </div>
        </Link>
      </div> //{/* placeholder to attribute */}
    );
  }
};
