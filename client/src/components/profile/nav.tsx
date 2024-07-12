import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// attempt to change the styling based on NavLink
export const ProfileNav = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${String(
    currentDate.getFullYear()
  ).slice(-2)}`;
  return (
    <>
      <span>
        <h4>Algorithm</h4> <p>{formattedDate}</p>
      </span>
      <div>
        <NavLink to="/profile">
          <img
            src="/home/ic_round-dashboard.svg"
            alt="dashboard"
          />
          Dashboard
        </NavLink>
        <NavLink to="/profile/post">
          <img
            src="/home/healthicons_person.svg"
            alt="dashboard"
          />
          Post
        </NavLink>
        <NavLink to="/profile/my-listings">
          <img
            src="/home/material-symbols_box-add-outline.svg"
            alt="dashboard"
          />
          My Listings
        </NavLink>
        {/* profile should link to edit profile in dashboard */}
        {/* <NavLink to="/profile/edit">
          <img
            src="/home/icon-park-outline_add-pic.svg"
            alt="dashboard"
          />
          Profile
        </NavLink> */}
        {/* <NavLink to="/profile/messages">
          <img
            src="/home/icon-park-outline_add-pic.svg"
            alt="messages"
          />
          Messages
        </NavLink> */}
        <NavLink to="/profile/media">
          <img
            src="/home/icon-park-outline_add-pic.svg"
            alt="dashboard"
          />
          Media
        </NavLink>
      </div>
      {/* <div>
        <hr />
        <p>Log Out</p>
      </div> */}
    </>
  );
};
