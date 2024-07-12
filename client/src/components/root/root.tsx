import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./rootUS3.module.css";
import Footer from "../global/footer";
import Cookies from "js-cookie";
import { Parent } from "../logOut/parent";
import { MoreContent } from "../header/more";
import logOutFn from "../../lib/users/logOut";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaWindowClose } from "react-icons/fa";

const Root = ({
  setTokenState,
  tokenState,
}: {
  setTokenState: React.Dispatch<React.SetStateAction<boolean>>;
  tokenState: boolean;
}) => {
  const location = useLocation();
  const token = Cookies.get("token");
  const [errMsg, setErrMsg] = useState("");

  // nav display logic
  const [isScreeMobile, setIsScreenMobile] = useState(
    window.innerWidth < 720 ? true : false
  );
  const [showMobileNavContent, setShowMobileNavContent] = useState(false);

  const [buttonVisible, setButtonVisible] = useState(
    isScreeMobile ? true : false
  );

  const [currentScreenWidth, setCurrentScreenWidth] = useState(
    window.innerWidth
  );
  function showNavMobile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setShowMobileNavContent((prev) => !prev);
  }

  function autoCloseNavMobile() {
    if (isScreeMobile) {
      setShowMobileNavContent(false);
    }
  }

  // make button show/hide automatically w/o refresh
  useEffect(() => {
    if (currentScreenWidth < 720) {
      // setButtonVisible(true);
      // setCurrentScreenWidth(window.innerWidth);
      console.log("show button");
    } else {
      // setButtonVisible(false);
      // setCurrentScreenWidth(window.innerWidth);
      console.log("hide button");
    }
  }, [currentScreenWidth]);

  return (
    <>
      <header
        className={`${
          showMobileNavContent ? styles.showNavMobile : styles.hideNavMobile
        }`}
      >
        <nav className={`${styles.navUS3} ${styles.nav} `}>
          <span>
            <Link to="/" className={styles.logo}>
              LOGO
            </Link>{" "}
            <button
              onClick={(e) => showNavMobile(e)}
              className={
                !buttonVisible ? styles.hideNavMobile : styles.showNavMobile
              }
            >
              {showMobileNavContent ? <FaWindowClose /> : <RxHamburgerMenu />}
            </button>
          </span>
          <div>
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? `${styles.current}`
                  : `${styles.nonActive}`
              }
              onClick={() => autoCloseNavMobile()}
            >
              Home
            </Link>
            <Link
              to="venues"
              className={
                location.pathname === "/venues"
                  ? `${styles.current}`
                  : `${styles.nonActive}`
              }
              onClick={() => autoCloseNavMobile()}
            >
              Venues
            </Link>
            <Link
              to="ticketing"
              className={
                location.pathname === "/ticketing"
                  ? `${styles.current}`
                  : `${styles.nonActive}`
              }
              onClick={() => autoCloseNavMobile()}
            >
              Ticketing
            </Link>
            <Link
              to="event-services"
              className={
                location.pathname === "/event-services"
                  ? `${styles.current}`
                  : `${styles.nonActive}`
              }
              onClick={() => autoCloseNavMobile()}
            >
              Event Services
            </Link>
            <Link
              to="about"
              className={
                location.pathname === "/about"
                  ? `${styles.current}`
                  : `${styles.nonActive}`
              }
              onClick={() => autoCloseNavMobile()}
            >
              About
            </Link>
            <Link
              to="blacklist"
              className={
                location.pathname === "/blacklist"
                  ? `${styles.current}`
                  : `${styles.nonActive}`
              }
              onClick={() => autoCloseNavMobile()}
            >
              Blacklist
            </Link>
            <div className={styles.moreContent}>
              <MoreContent onClick={() => autoCloseNavMobile()} />
            </div>
            {!token || token === undefined ? (
              <div>
                <Link
                  to="sign-up"
                  className={`${
                    location.pathname === "/sign-up"
                      ? styles.current
                      : styles.nonActive
                  } ${styles.navAuthBtn}`}
                  onClick={() => autoCloseNavMobile()}
                >
                  Sign up
                </Link>
                <Link
                  to="login"
                  className={`${
                    location.pathname === "/login"
                      ? styles.current
                      : styles.nonActive
                  } ${styles.navAuthBtn}`}
                  onClick={() => autoCloseNavMobile()}
                >
                  Login
                </Link>
              </div>
            ) : (
              <>
                {/* parent of log out */}
                <Parent
                  setTokenState={setTokenState}
                  autoCloseNavMobile={autoCloseNavMobile}
                />
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Root;
