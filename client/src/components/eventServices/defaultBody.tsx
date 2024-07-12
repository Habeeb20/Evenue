import { GroupSuggestions } from "../groups/suggestions";
import { VenueOrEventAd } from "../home/venueAd";
import { PopularPhotos } from "./popularPhoto";

export const DefaultBody = () => {
  return (
    <>
      <section>
        <PopularPhotos />
      </section>
      <section>
        {/* placeholder to attribute */}
        <VenueOrEventAd
          props="Find the, BEST, VENUE, for your, Events "
          body="Lorem ipsum dolor sit amet consectetur. Velit viverra rhoncus pharetra in ut sit."
          toAttr="venues"
        />
      </section>
      <GroupSuggestions />
    </>
  );
};
