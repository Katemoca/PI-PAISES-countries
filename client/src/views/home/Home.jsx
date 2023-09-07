/* eslint-disable no-unused-vars */
import NavBar from "../../components/navBar/NavBar";
import CardsContainer from "../../components/cardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries } from "../../redux/actions/actions";

import styles from "./Home.module.css";

export default function Home() {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  //! UseEffects (ciclos de vida del componente)
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div>
      <NavBar />

      <div className={styles.homecontainer}>
        <div>
          <button>A-Z</button>
          <button>Z-A</button>
        </div>
        <div>
          <label>Continents</label>
          <select>
            <option>Africa</option>
            <option>Europe</option>
            <option>Asia</option>
            <option>Oceania</option>
            <option>Antarctica</option>
            <option>South America</option>
            <option>North America</option>
          </select>
        </div>
        <div>
          <label>Activity by season</label>
          <select>
            <option></option>
          </select>
        </div>
        <div>
          <label>Activity by country</label>
          <select>
            <option></option>
          </select>
        </div>
        <div className={styles.textintro}>
          <p>{`Let's take a global tour to explore various countries and the immense possibilities for having fun. 🌎✈️ `}</p>
        </div>
        <div>
          <CardsContainer countries={countries} />
        </div>
      </div>
    </div>
  );
}
