import { GroupsList } from "./groupsList";
import styles from "./styles/suggestions34D.module.css";

export const GroupSuggestions = () => {
  return (
    <div className={styles.container34D}>
      <h3>Groups you may like</h3>
      <div>
        <GroupsList
          startNo={0}
          endNo={6}
        />
      </div>
    </div>
  );
};
