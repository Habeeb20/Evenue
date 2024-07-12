import { useEffect, useState } from "react";
import deleteEventFn from "../../lib/admin/deleteEvent";
import getVenuesFn, { Welcome9 } from "../../lib/admin/getVenues";
import deleteVenueFn from "../../lib/admin/deleteVenue";

export const VenueListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [venueList, setVenueList] = useState<Welcome9>();
  useEffect(() => {
    (async () => {
      const res = await getVenuesFn({ setErrMsg });

      res && setVenueList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteVenueFn({ setErrMsg, venue_id: id.toString() });

    if (res?.message.includes("success")) {
      const res1 = await getVenuesFn({ setErrMsg });
      res1 && setVenueList(res1);
    }
  };
  return (
    <div>
      Venues
      {errMsg && <p>{errMsg}</p>}
      <ol>
        {venueList?.result.map((venue) => (
          <li key={venue.id}>
            {venue.title}
            <button onClick={() => handleDelete(venue.id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
