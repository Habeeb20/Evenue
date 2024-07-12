import { AddSearchFD } from "../../typesAndInterfaces/venues/addSearchFormData";
import { handleInputChange } from "../global/handleInputChange";
import styles from "./styles/heroI1W.module.css";

interface Props {
  formDetails: AddSearchFD;
  setFormDetails: React.Dispatch<React.SetStateAction<AddSearchFD>>;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Hero = ({ formDetails, setFormDetails, handleSearch }: Props) => {
  return (
    <div className={styles.containerI1W}>
      <div className={styles.contentBox}>
        <h1>Book a Venue for your Event</h1>
        <div>
          <div>
            <div>
              <select
                name="category"
                value={formDetails.category}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              >
                <option value="null">Category</option>
                <option value="meetings">Meetings</option>
                <option value="shows">Shows</option>
                <option value="academic">Academic</option>
                <option value="boardrooms">Boardrooms</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={formDetails.location}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
              <input
                type="text"
                placeholder="No of guest"
                name="no_of_guest"
                value={formDetails.no_of_guest}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
              <input
                type="text"
                placeholder="Venue type"
                name="venue_type"
                value={formDetails.venue_type}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
              <input
                type="text"
                placeholder="Space preference"
                name="space_preference"
                value={formDetails.space_preference}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
              <input
                type="text"
                placeholder="Rating"
                name="rating"
                value={formDetails.rating}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};
