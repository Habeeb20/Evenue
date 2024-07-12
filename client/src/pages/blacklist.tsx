import { Helmet } from "react-helmet";
import { BlacklistEvents } from "../components/blacklist/events";
import { Hero } from "../components/blacklist/hero";
import { BlacklistVenue } from "../components/blacklist/venues";

const Blacklist = () => {
  return (
    <article>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blacklist</title>
        <link rel="canonical" href="https://evenue.ng/blacklist" />
      </Helmet>
      <Hero />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 2rem",
          rowGap: "1rem",
        }}
      >
        <p>
          At E-Venues, we are committed to providing a safe, reliable, and
          high-quality experience for all our users. To maintain the integrity
          and trustworthiness of our platform, we have established a blacklist
          to identify venues, centers, and individuals who have violated our
          terms of service or demonstrated unacceptable behavior. We strive to
          be transparent and fair in our blacklisting process. Affected parties
          will be notified and given an opportunity to respond to any
          allegations. We conduct thorough investigations to ensure that our
          decisions are based on accurate and reliable information. By
          blacklisting venues, centers, and individuals that fail to meet our
          standards, we protect our community and maintain our quality and
          integrity. Why We Blacklist
        </p>
        <p>
          The decision to blacklist a venue, center, or individual is not taken
          lightly. We enforce this measure to:
        </p>
        <ul>
          <li>
            Ensure Safety: Protect our users from unsafe or hazardous
            environments.
          </li>
          <li>
            Maintain Quality: Preserve the high standards of service and
            professionalism expected by our community.
          </li>
          <li>
            Uphold Trust: Foster a trustworthy and reliable platform for all
            event organizers and attendees.
          </li>
        </ul>
        <h2>Blacklisting Criteria</h2>
        <p>
          A venue, center, or individual may be blacklisted for reasons
          including, but not limited to:
        </p>
        <ul>
          <li>
            Breaches of Contract: Failure to honor agreements or terms of
            service.
          </li>
          <li>
            Safety Violations: Inadequate safety measures or hazardous
            conditions.
          </li>
          <li>
            Fraudulent Activities: Engaging in fraudulent or deceptive
            practices.
          </li>
          <li>
            Unprofessional Conduct: Consistently poor service, unprofessional
            behavior, or negative reviews.
          </li>
          <li>
            Legal Issues: Involvement in illegal activities or legal disputes
            affecting event operations.
          </li>
        </ul>

        <h2>How to Report a Problem</h2>
        <p>
          If you encounter a venue, center, or individual that you believe
          should be blacklisted, please report the issue to our support team.
          Provide detailed information and any relevant evidence to support your
          claim. Our team will investigate the matter thoroughly and take
          appropriate action. Appeals Process
        </p>
        <p>
          If you have been blacklisted and believe the decision was made in
          error, you have the right to appeal. Contact our support team to
          initiate the appeals process. Provide any additional information or
          evidence that may help in reconsidering your case. We will review your
          appeal and make a final determination.
        </p>
      </section>
      <section>
        <BlacklistVenue />
      </section>
      <section>
        <BlacklistEvents />
      </section>
    </article>
  );
};
export default Blacklist;
