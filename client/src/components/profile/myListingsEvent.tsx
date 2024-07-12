import stylesDetails from "../../components/profile/styles/personalDetailsFY8.module.css";
import { SearchEvents } from "../../typesAndInterfaces/profile/searchEvents";
import { handleInputChange } from "../global/handleInputChange";

type Props = {
  showEvent: boolean;
  handleShowEvent: (e: React.MouseEvent) => void;
  handleShowVenue: (e: React.MouseEvent) => void;
  total: number;
  venuesTotal: number;
  formDetails: SearchEvents;
  setFormDetails: React.Dispatch<React.SetStateAction<SearchEvents>>;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const MLEvents = ({
  showEvent,
  handleShowVenue: handleShowEdit,
  handleShowEvent: handleShowProfile,
  total,
  venuesTotal,
  formDetails,
  setFormDetails,
  handleSearch,
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
            <label htmlFor="name"></label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={formDetails.name}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="category"></label>
            <input
              type="text"
              placeholder="category"
              name="category"
              value={formDetails.category}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="frequency"></label>
            <input
              type="text"
              placeholder="frequency"
              name="frequency"
              value={formDetails.frequency}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="price"></label>
            <input
              type="text"
              placeholder="price"
              name="price"
              value={formDetails.price}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="location"></label>
            <input
              type="text"
              placeholder="location"
              name="location"
              value={formDetails.location}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
        </section>
        <div className={stylesDetails.buttonDiv}>
          <button onClick={handleSearch}>Search</button>
        </div>
      </form>
    </>
  );
};
