import { useParams } from "react-router-dom";
import { Card } from "./card";
import { useState, useEffect } from "react";
import { VenueFullInfoResponse } from "../../typesAndInterfaces/venues/getVenue";
import getVenueFn from "../../lib/venues/getVenue";
import { ErrMsg } from "../global/errMsg";
import { GroupSuggestions } from "../groups/suggestions";

export const DynamicVenue = () => {
  const { venue_id } = useParams();
  const [res, setres] = useState<VenueFullInfoResponse>();
  const [errMsg, setErrMsg] = useState("");

  // convert venue_id to number
  const venueId = Number(venue_id);

  if (!venueId) {
    throw new Error("Missing venue_id");
  }

  useEffect(() => {
    try {
      getVenueFn({ venue_id: venueId, setErrMsg }).then((res) => {
        res && setres(res);
      });
    } catch (error) {}
  }, [venueId]);

  const cardContent = res?.result.map((venue) => (
    <Card
      key={venue.id}
      {...venue}
    />
  ));

  return (
    <div>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          {cardContent}
          {/* <p>Review component here</p> */}
          <GroupSuggestions />
        </>
      )}
    </div>
  );
};
