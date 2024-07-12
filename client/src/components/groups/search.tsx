import React from "react";
import styles from "./styles/search01Y.module.css";

export const Search = ({
  setGroup_name,
  handleSearch,
}: {
  setGroup_name: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      className={styles.form01Y}
      onSubmit={handleSearch}
    >
      <label htmlFor="name"></label>
      <input
        type="text"
        placeholder="Enter group name..."
        name="group_name"
        onChange={(e) => setGroup_name(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
};
