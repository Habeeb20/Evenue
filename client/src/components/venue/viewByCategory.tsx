import { useParams } from "react-router-dom";
import { BlankVenue4StatesCat } from "./blankVenue4StateCat";
import styles from "./styles/viewByCategoryDKI.module.css";

export const ViewByCategoryV = () => {
  const { category_identifier } = useParams();

  if (!category_identifier) {
    throw new Error("pass category view");
  }
  // capitalize title
  const title =
    category_identifier.charAt(0).toUpperCase() + category_identifier.slice(1);
  return (
    <article className={styles.containerDKI}>
      <BlankVenue4StatesCat
        locationIdentifier={category_identifier}
        title={`${title} venues`}
      />
    </article>
  );
};
