/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import appLogo from "../../assets/logos/5logoPI (2).png";
import SearchBar from "../searchBar/SearchBar";

import styles from "./NavBar.module.css";

export default function NavBar({ page, countries }) {
  let location = useLocation();

  return (
    <div className={styles.navcontainer}>
      <div className={styles.imgcontainer}>
        <img src={appLogo} alt="mainlogo" />
      </div>
      <div className={styles.linkcontainer}>
        {location.pathname !== "/home" && (
          <button>
            <Link to="/home" className={styles.Link}>
              ⬅BACK TO HOMEPAGE
            </Link>
          </button>
        )}
        {location.pathname !== "/create" && (
          <button>
            <Link to="/create" className={styles.Link}>
              CREATE YOUR ACTIVITY 📝
            </Link>
          </button>
        )}
      </div>
      <div className={styles.searchBar}>
        <SearchBar page={page} countries={countries} />
        <button
          className={styles.buttonResetLink}
          onClick={() => {
            window.location.reload();
          }}>
          RESET ALL
        </button>
      </div>
    </div>
  );
}
