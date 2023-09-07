/* eslint-disable react/prop-types */
import Card from "../card/Card";
import styles from "./CardsContainer.module.css";

function CardsContainer({ countries }) {
  return (
    <div className={styles.cardsmaincontainer}>
      <div className={styles.cardscontainer}>
        {countries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flags={country.flags}
            continents={country.continents}
            capital={country.capital}
            subregion={country.subregion}
            area={country.area}
            population={country.population}
          />
        ))}
      </div>
    </div>
  );
}

export default CardsContainer;
