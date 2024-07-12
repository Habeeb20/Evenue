import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn1Content } from "../components/eventServices/btn1Content";
import { Btn2Content } from "../components/eventServices/btn2Content";
import { Btn3Content } from "../components/eventServices/btn3Content";
import { DefaultBody } from "../components/eventServices/defaultBody";
import { Hero } from "../components/eventServices/hero";
import LimitedInfoCard from "../components/eventServices/limitedInfoCard";
import { ErrMsg } from "../components/global/errMsg";
import { LoginNotice } from "../components/global/loginNotice";
import eventServicesSearchFn from "../lib/eventsShowcase/search";
import { GetLimitedInfoForAllResponse } from "../typesAndInterfaces/eventServices/getLimitedInfoForAll";
import { SearchFD } from "../typesAndInterfaces/eventServices/searchFD";
import styles from "./styles/eventServicseOTW.module.css";
import getCountByCatFn from "../lib/eventsServices/getCountByCategory";
import { Res4CountByCategory } from "../typesAndInterfaces/eventServices/res4CountByCategory";
import { Helmet } from "react-helmet";

const EventServices = () => {
  const [formDetails, setFormDetails] = useState<SearchFD>({
    location: "",
    category: "",
  });

  const [eventServices, setEventServices] =
    useState<GetLimitedInfoForAllResponse>();
  const [errMsg, setErrMsg] = useState("");
  const [specificEService, setSpecificEService] = useState(false);
  const [btnPageContent, setBtnPageContent] = useState(<></>);
  const [showLoginErr, setShowLoginErr] = useState(false);
  const [countByCat, setCountByCat] = useState<Res4CountByCategory>();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getCountByCatFn({ setErrMsg }).then((res) => {
        res && setCountByCat(res);
      });
    } catch (error) {}
  }, []);

  async function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await eventServicesSearchFn({
        location: formDetails.location ?? "",
        category: formDetails.category ?? "",
        setErrMsg,
      });

      setEventServices(res);
      setErrMsg("");
    } catch (error) {}
  }

  const content = eventServices?.result?.map((event) => (
    <LimitedInfoCard key={event.id} {...event} />
  ));

  // get the total count for each category
  const designersCount = countByCat?.result.find(
    (count) => count.total_designers
  )?.total_designers;
  const mkupartCount = countByCat?.result.find(
    (count) => count.total_make_up_artise
  )?.total_make_up_artise;
  const videoPhotoCount = countByCat?.result.find(
    (count) => count.total_photo_video_makers
  )?.total_photo_video_makers;

  const btn1Content = <Btn1Content />;
  const btn2Content = <Btn2Content />;
  const btn3Content = <Btn3Content />;

  // on click for buttons to determine
  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.name === "btn1") {
      setSpecificEService(true);
      setBtnPageContent(btn1Content);
    } else if (e.currentTarget.name === "btn2") {
      setSpecificEService(true);
      setBtnPageContent(btn2Content);
    } else if (e.currentTarget.name === "btn3") {
      setSpecificEService(true);
      setBtnPageContent(btn3Content);
    }
  }

  function handleCreateService(e: React.MouseEvent<HTMLButtonElement>) {
    if (!token) {
      setShowLoginErr(true);
      setTimeout(() => {
        setShowLoginErr(false);
      }, 10000);
      return;
    } else {
      navigate(`/e-service/create-service`);
    }
  }

  return (
    <article className={styles.containerOTW}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Event Services</title>
        <link rel="canonical" href="https://evenue.ng/event-services" />
      </Helmet>
      <Hero
        formDetails={formDetails}
        setFormDetails={setFormDetails}
        handleSearch={handleSearch}
      />
      <>
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 2rem",
            rowGap: "1rem",
          }}
        >
          Planning an event can be challenging, but finding the perfect venue
          shouldn't be. At E-Venue, we make it easy to discover, compare, and
          book the ideal location for any occasion. Our platform features a wide
          variety of venues to suit any type of event. Whether you're hosting a
          wedding, corporate meeting, birthday party, or concert, you'll find
          the perfect space among our extensive listings. From intimate settings
          to grand halls, we cater to every need and preference.
        </p>
      </>
      <div>
        <h3>Service Providers</h3>

        <div>
          <button name="btn1" onClick={handleBtnClick}>
            <img src="/home/photographers.svg" alt="photographers" />
            <span>Photography/ Videographer ({videoPhotoCount})</span>
          </button>
          <button name="btn2" onClick={handleBtnClick}>
            <img src="/home/make_up_artise.svg" alt="Make up Artise" />
            <span>Make up Artise ({mkupartCount})</span>
          </button>
          <button name="btn3" onClick={handleBtnClick}>
            <img src="/home/designers.svg" alt="designers" />
            <span>Designers ({designersCount})</span>
          </button>
        </div>
      </div>
      <div className={styles.addServiceArea}>
        <button onClick={handleCreateService}>Create Service</button>
        {showLoginErr && <LoginNotice />}
      </div>
      {specificEService ? (
        btnPageContent
      ) : eventServices || errMsg ? (
        <>{errMsg ? <ErrMsg errMsg={errMsg} /> : <div>{content}</div>}</>
      ) : (
        <>
          <DefaultBody />
        </>
      )}
    </article>
  );
};
export default EventServices;
