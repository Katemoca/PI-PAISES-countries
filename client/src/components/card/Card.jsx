/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ id, name, flags, continents }) {
  return (
    <div>
      <Link className={styles.linktodetail} to={`/detail/${id}`}>
        <div className={styles.cardinfocontainer}>
          <div className={styles.namecontainer}>
            <h5>{name}</h5>
          </div>
          <div className={styles.imgcontainer}>
            <img className={styles.countryflagimg} src={flags} alt={name} />
          </div>
          <div className={styles.continentcontainer}></div>
          <p>{continents}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
