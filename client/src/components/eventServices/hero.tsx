import { SearchFD } from "../../typesAndInterfaces/eventServices/searchFD";
import { handleInputChange } from "../global/handleInputChange";
import styles from "./styles/heroQ22.module.css";

interface Props {
  formDetails: SearchFD;
  setFormDetails: React.Dispatch<React.SetStateAction<SearchFD>>;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Hero = ({ formDetails, setFormDetails, handleSearch }: Props) => {
  return (
    <div className={styles.containerQ22}>
      <div className={styles.contentBox}>
        <h1>
          <span>Discover</span> where the <span>Fun</span> is
        </h1>
        <div>
          <div>
            <div>
              <select
                name="category"
                value={formDetails.category}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              >
                <option value="null">Category</option>
                <option value="Photography/Videography">
                  Photography/Videography
                </option>
                <option value="make_up_artise">make up artise</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={formDetails.location}
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
