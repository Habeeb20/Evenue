import stylesDetails from "../../components/profile/styles/personalDetailsFY8.module.css";
import { SearchEvents } from "../../typesAndInterfaces/profile/searchEvents";
import { SearchVenues } from "../../typesAndInterfaces/profile/searchVenues";
import { handleInputChange } from "../global/handleInputChange";

type Props = {
  showEvent: boolean;
  handleShowEvent: (e: React.MouseEvent) => void;
  handleShowVenue: (e: React.MouseEvent) => void;
  total: number;
  venuesTotal: number;
  formDetailsVenue: SearchVenues;
  setFormDetailsVenue: React.Dispatch<React.SetStateAction<SearchEvents>>;
  handleVenuesSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const MLVenues = ({
  showEvent,
  handleShowVenue: handleShowEdit,
  handleShowEvent: handleShowProfile,
  total,
  venuesTotal,
  formDetailsVenue,
  setFormDetailsVenue,
  handleVenuesSearch,
}: Props) => {
  return (
    <>
      <div>
        <button
          onClick={handleShowProfile}
          className={showEvent ? stylesDetails.active : stylesDetails.nonActive}
        >
          Event({total})
        </button>
        <button
          onClick={handleShowEdit}
          className={
            !showEvent ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          Venue({venuesTotal})
        </button>
      </div>

      <form>
        <section>
          <div>
            <label htmlFor="title"></label>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={formDetailsVenue.title}
              onChange={(e) => handleInputChange(e, setFormDetailsVenue)}
            />
          </div>
          <div>
            <label htmlFor="category"></label>
            <input
              type="text"
              placeholder="category"
              name="category"
              value={formDetailsVenue.category}
              onChange={(e) => handleInputChange(e, setFormDetailsVenue)}
            />
          </div>
          <div>
            <label htmlFor="venue_type"></label>
            <input
              type="text"
              placeholder="venue_type"
              name="venue_type"
              value={formDetailsVenue.venue_type}
              onChange={(e) => handleInputChange(e, setFormDetailsVenue)}
            />
          </div>
          <div>
            <label htmlFor="starting_price"></label>
            <input
              type="text"
              placeholder="starting_price"
              name="starting_price"
              value={formDetailsVenue.starting_price}
              onChange={(e) => handleInputChange(e, setFormDetailsVenue)}
            />
          </div>
          <div>
            <label htmlFor="location"></label>
            <input
              type="text"
              placeholder="location"
              name="location"
              value={formDetailsVenue.location}
              onChange={(e) => handleInputChange(e, setFormDetailsVenue)}
            />
          </div>
        </section>
        <div className={stylesDetails.buttonDiv}>
          <button onClick={handleVenuesSearch}>Search</button>
        </div>
      </form>
    </>
  );
};
