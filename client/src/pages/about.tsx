import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
        <link rel="canonical" href="https://evenue.ng/about" />
      </Helmet>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 2rem",
          rowGap: "1rem",
        }}
      >
        <p>
          Welcome to E-Venue, your ultimate platform for connecting people with
          perfect event venues and unforgettable experiences. Whether you're
          looking to list your event center, book a venue for your special
          occasion, promote your upcoming event, or purchase tickets for an
          event, we have you covered.
        </p>
        <h2>Our Mission</h2>
        <p>
          At E-Venue, our mission is to simplify the process of finding and
          booking event centers, making it easier for organizers and attendees
          to come together. We strive to provide a seamless experience for venue
          owners, event planners, and participants alike, fostering a vibrant
          community where memorable events can thrive.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li>
            Venue Listings: Our platform allows venue owners to list their event
            centers with ease. From cozy banquet halls to grand ballrooms, we
            provide a comprehensive directory of venues that cater to all types
            of events.
          </li>
          <li>
            Event Booking: Planning an event? Browse our extensive collection of
            venues, filter by location, capacity, and amenities, and book the
            perfect space for your next event. Whether it’s a wedding, corporate
            event, or private party, we help you find the ideal setting.
          </li>
          <li>
            Event Promotion: Got an upcoming event? Post it on our platform to
            reach a wider audience. We offer tools to help you promote your
            event, engage with attendees, and ensure a successful turnout.
          </li>
          <li>
            Ticket Sales: Selling tickets for your event? Our platform makes it
            easy to manage ticket sales, track attendance, and provide a smooth
            purchasing experience for your guests. Why Choose Us?
          </li>
          <li>
            Comprehensive Listings: Our platform features a wide variety of
            venues to suit any type of event. Whether you're hosting a wedding,
            corporate meeting, birthday party, or concert, you'll find the
            perfect space among our extensive listings. From intimate settings
            to grand halls, we cater to every need and preference.
          </li>
          <li>
            User-Friendly Interface: Our platform is designed for ease of use,
            making it simple to list, find, and book venues. We provide an easy
            booking process because once you've found the perfect venue, our
            seamless booking process allows you to reserve your space with just
            a few clicks. We provide a secure and efficient system for
            confirming your booking, ensuring a hassle-free experience from
            start to finish.
          </li>
          <li>
            Detailed Venue Profiles: Each venue listing comes with a detailed
            profile, including high-quality photos, descriptions, amenities, and
            user reviews. This information helps you get a clear picture of what
            each venue offers, so you can make an informed decision.
          </li>
          <li>
            Personalized Recommendations: Not sure where to start? Our
            personalized recommendation engine can suggest venues based on your
            event type, preferences, and past searches. This tailored approach
            saves you time and helps you discover hidden gems you might have
            otherwise missed.
          </li>
          <li>
            Community Support: We believe in building a supportive community for
            event organizers and venue owners, offering resources and support to
            help you succeed. Whether you have questions about a venue, need
            help with the booking process, or require special accommodations,
            we're just a call or click away.
          </li>
          <li>
            Advanced Search Filters: With our advanced search filters, you can
            easily narrow down your options. Filter by location, capacity, price
            range, amenities, and more to find a venue that matches your
            specific requirements. Our intuitive interface ensures that you can
            quickly and efficiently find the best options available.
          </li>
          <li>
            Compare and Choose: Easily compare multiple venues side-by-side to
            evaluate their features, pricing, and availability. Our comparison
            tools make it straightforward to weigh your options and choose the
            venue that best fits your event's needs.
          </li>
          <li>
            Community Reviews and Ratings: Read reviews and ratings from other
            users who have booked venues through our platform. Their experiences
            can provide valuable insights and help you make a confident choice.
            You can also contribute your own reviews after your event to help
            others in the community.
          </li>
          <li>
            Customer Support: Our dedicated customer support team is here to
            assist you at every step.
          </li>
          <li>
            Secure Transactions: We prioritize the security of your
            transactions, ensuring safe and reliable bookings and ticket
            purchases.
          </li>
        </ul>
        <h2>Join Our Community</h2>
        <p>
          E-Venue is more than just a platform; it’s a community of event
          enthusiasts dedicated to creating and experiencing unforgettable
          moments. Join us today and be a part of a network that celebrates the
          power of connection through events.
        </p>
      </section>
    </div>
  );
};
export default About;
