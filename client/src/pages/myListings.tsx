import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { LimitedInfoCard } from "../components/profile/eventCard";
import { MLEvents } from "../components/profile/myListingsEvent";
import { ProfileNav } from "../components/profile/nav";
import stylesDetails from "../components/profile/styles/personalDetailsFY8.module.css";
import styles from "../components/profile/styles/profileMainJS4.module.css";
import stylesNav from "../components/profile/styles/profileNavZZZ.module.css";
import getProfileFn from "../lib/profile/getProfile";
import { ProfileRes } from "../typesAndInterfaces/profile/getProfile";
import { ErrMsg } from "../components/global/errMsg";
import { EventProfileLRes } from "../typesAndInterfaces/profile/getLimitedInfo";
import getEventProfileFn from "../lib/profile/getEvents";
import searchEventsFn from "../lib/profile/searchEvents";
import {
  SearchEvents,
  SearchRes,
} from "../typesAndInterfaces/profile/searchEvents";
import { MLVenues } from "../components/profile/myListingsVenue";
import getVenueProfileFn from "../lib/profile/getVenues";
import searchVenuesFn from "../lib/profile/searchVenues";
import {
  SearchVenues,
  VenuesRes,
} from "../typesAndInterfaces/profile/searchVenues";

export const MyListings = () => {
  const [profileRes, setProfileRes] = useState<ProfileRes>();
  const [eventRes, setEventRes] = useState<EventProfileLRes>();
  const [venueRes, setVenueRes] = useState<EventProfileLRes>();
  const [showEvent, setShowEvent] = useState(true);
  //   const [showDefaultDetails, setShowDefaultDetails] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  //   const navigate = useNavigation();

  // search states
  const [formDetails, setFormDetails] = useState<SearchEvents>({
    name: "",
    location: "",
    category: "",
    frequency: "",
    price: "",
  });

  const [formDetailsVenue, setFormDetailsVenue] = useState<SearchVenues>({
    title: "",
    location: "",
    category: "",
    venue_type: "",
    starting_price: "",
  });

  const [searchRes, setSearchRes] = useState<SearchRes>();
  const [venueSearchRes, setVenueSearchRes] = useState<VenuesRes>();
  // end of search states

  useEffect(() => {
    try {
      getProfileFn({ setErrMsg })
        .then((res) => {
          res && setProfileRes(res);
        })
        .then(() => {
          getEventProfileFn({ setErrMsg }).then((res) => {
            res && setEventRes(res);
          });
        });
    } catch (error) {}
  }, []);

  // map eventRes
  const eventResMapped = eventRes?.finalResult[0].map((event) => (
    <LimitedInfoCard key={event.event_id} {...event} />
  ));

  // Assuming MLEvents accepts a prop named 'total'
  const total = eventRes?.finalResult[1].reduce(
    (acc, event) => acc + event.total,
    0
  );

  async function handleShowVenue(e: React.MouseEvent) {
    e.preventDefault();
    setShowEvent(false);

    try {
      getVenueProfileFn({ setErrMsg }).then((res) => {
        res && setVenueRes(res);
      });
    } catch (error) {}
  }

  const venuesResMapped = venueRes?.finalResult[0].map((venue) => (
    <LimitedInfoCard key={venue.event_id} {...venue} />
  ));

  const venuesTotal = venueRes?.finalResult[1].reduce(
    (acc, venue) => acc + venue.total,
    0
  );

  function handleShowEvent(e: React.MouseEvent) {
    e.preventDefault();
    setShowEvent(true);
  }

  // Search logic
  async function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      searchEventsFn({
        name: formDetails.name ?? "",
        location: formDetails.location ?? "",
        category: formDetails.category ?? "",
        frequency: formDetails.frequency ?? "",
        price: formDetails.price ?? "",
        setErrMsg,
      }).then((res) => {
        res && setSearchRes(res);
        setErrMsg("");
      });
    } catch (error) {}
  }

  const searchContent = searchRes?.result.map((event) => (
    <LimitedInfoCard key={event.event_id} {...event} />
  ));
  // end of search logic

  // venues search logic
  async function handleVenuesSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      searchVenuesFn({
        title: formDetailsVenue.title ?? "",
        location: formDetailsVenue.location ?? "",
        category: formDetailsVenue.category ?? "",
        venue_type: formDetailsVenue.venue_type ?? "",
        starting_price: formDetailsVenue.starting_price ?? "",
        setErrMsg,
      }).then((res) => {
        res && setVenueSearchRes(res);
        setErrMsg("");
      });
    } catch (error) {}
  }

  const venuesSearchContent = venueSearchRes?.result.map((event) => (
    <LimitedInfoCard key={event.event_id} {...event} />
  ));

  const token = Cookies.get("token");
  // Replace with navigate
  if (!token) {
    window.location.href = "/login";
  }

  return (
    <div className={styles.containerJS4}>
      <section>
        <nav className={stylesNav.containerZZZ}>
          <ProfileNav />
        </nav>
        {errMsg ? (
          <div className={styles.errMsg}>
            <ErrMsg errMsg={errMsg} />
          </div>
        ) : (
          profileRes?.profile.map((user) => (
            <article key={user.user_id}>
              <section className={styles.header}>
                <div>
                  {/*TODO: Capitalize first_name preferrably from the database*/}

                  <h2>My Listings </h2>
                </div>
                <div>
                  <div>
                    <img src={user.img} alt="profile" />
                  </div>
                  <div>
                    <p>{user.first_name + " " + user.last_name}</p>
                    <p>{user.email}</p>
                  </div>
                  {/* <div>
                    <img
                      src="/home/bell.svg"
                      alt="bell"
                    />
                  </div> */}
                </div>
              </section>
              {showEvent ? (
                <>
                  <section className={stylesDetails.containerFY8}>
                    <MLEvents
                      showEvent={showEvent}
                      handleShowVenue={handleShowVenue}
                      handleShowEvent={handleShowEvent}
                      total={total || 0}
                      venuesTotal={venuesTotal || 0}
                      /**passing search props */
                      formDetails={formDetails}
                      setFormDetails={setFormDetails}
                      handleSearch={handleSearch}
                    />{" "}
                  </section>
                  {errMsg ? (
                    <ErrMsg errMsg={errMsg} />
                  ) : !searchContent ? (
                    <section className={stylesDetails.eventsListFY8}>
                      {eventResMapped}
                    </section>
                  ) : (
                    <section className={stylesDetails.eventsListFY8}>
                      {searchContent}
                    </section>
                  )}
                </>
              ) : (
                <>
                  <section className={stylesDetails.containerFY8}>
                    <MLVenues
                      showEvent={showEvent}
                      handleShowVenue={handleShowVenue}
                      handleShowEvent={handleShowEvent}
                      total={total || 0}
                      venuesTotal={venuesTotal || 0}
                      /**passing search props */
                      formDetailsVenue={formDetailsVenue}
                      setFormDetailsVenue={setFormDetailsVenue}
                      handleVenuesSearch={handleVenuesSearch}
                    />{" "}
                  </section>
                  {errMsg ? (
                    <ErrMsg errMsg={errMsg} />
                  ) : !venuesSearchContent ? (
                    <section className={stylesDetails.eventsListFY8}>
                      {venuesResMapped}
                    </section>
                  ) : (
                    <section className={stylesDetails.eventsListFY8}>
                      {venuesSearchContent}
                    </section>
                  )}
                </>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
};
