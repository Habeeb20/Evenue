import stylesDetails from "../../components/profile/styles/personalDetailsFY8.module.css";
import { CreateVenueForm } from "../venue/createVenueForm";

type Props = {
  showProfile: boolean;
  handleShowProfile: (e: React.MouseEvent) => void;
  handleShowEdit: (e: React.MouseEvent) => void;
  first_name: string;
};

export const PostVenue = ({
  showProfile,
  handleShowEdit,
  handleShowProfile,
  first_name,
}: Props) => {
  return (
    <>
      <div>
        <button
          onClick={handleShowProfile}
          className={
            showProfile ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          Event
        </button>
        <button
          onClick={handleShowEdit}
          className={
            !showProfile ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          Venue
        </button>
      </div>
      <div>
        <CreateVenueForm first_name={first_name} />
      </div>
    </>
  );
};
