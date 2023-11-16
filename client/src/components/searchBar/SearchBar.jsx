/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./SearchBar.module.css";
import { searchCountryByName } from "../../redux/actions/actions";

const SearchBar = ({ page, countries }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  //!Handler para el input
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  //!Handler para el botón
  const handleSearchButton = (event) => {
    event.preventDefault();
    dispatch(searchCountryByName(name));
    setName("");
    page(1);
  };

  // console.log(`Search Results, ${countries}`);

  return (
    <div>
      <input
        type="text"
        placeholder="Search the country here 🌎"
        value={name}
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} onClick={handleSearchButton}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
