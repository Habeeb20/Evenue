import { Link } from "react-router-dom";
import styles from "./styles/footerMR6.module.css";

const Footer = () => {
  return (
    <div className={styles.footerMR6}>
      <div>
        <h6>About</h6>
        <p style={{ color: "#f8f8f8" }}>
          Welcome to E-Venue, your ultimate platform for connecting people with
          perfect event venues and unforgettable experiences. Whether you're
          looking to list your event center, book a venue for your special
          occasion, promote your upcoming event, or purchase tickets for an
          event, we have you covered.
        </p>
        <Link to="/about">Learn more</Link> {/* placeholder to attribute */}
      </div>
      <div>
        <h6>Company</h6>

        <p>
          <Link to="/about">About</Link>
        </p>
        <p>
          <Link to="/contact">Contact</Link>
        </p>
        <p>
          <Link to="/terms">Terms</Link>
        </p>
        <p>
          <Link to="/privacy">Privacy</Link>
        </p>
        <p>
          <Link to="/admin">Admin</Link>
        </p>
      </div>
      <div>
        {/* <p>
          <Link to="/contact">Contact</Link>
        </p>
        <p>
          <Link to="/terms">Terms</Link>
        </p> */}
      </div>
      <div>
        <h6>Follow</h6>
        <div>
          <Link to="/contact">
            <img src="/home/ic_baseline-facebook.svg" alt="facebook" />
          </Link>

          <Link to="/contact">
            <img src="/home/Vector.svg" alt="ig" />
          </Link>

          <Link to="/contact">
            <img src="/home/mdi_linkedin.svg" alt="linkedin" />
          </Link>

          <Link to="/contact">
            <img src="/home/ph_x-fill.svg" alt="x" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
