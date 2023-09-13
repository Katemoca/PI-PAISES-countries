import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryDetail } from "../../redux/actions/actions";

import styles from "./Detail.module.css";
import loading from "../../assets/loading/greenshape.gif";

export default function Detail() {
  const { id } = useParams();
  const detailCountry = useSelector((state) => state.detailCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.detailcontainer}>
      <div className={styles.detailcontainerlink}>
        <button>
          <Link to="/home" className={styles.LinkNavBar}>
            ⬅BACK TO HOMEPAGE
          </Link>
        </button>
        <button>
          <Link to="/create" className={styles.LinkNavBar}>
            CREATE YOUR ACTIVITY 📝
          </Link>
        </button>
      </div>
      {console.log(detailCountry)}

      {detailCountry.name ? (
        <div className={styles.container}>
          <h2>{detailCountry.name}</h2>
          <div>
            <img
              className={styles.flagsimg}
              src={detailCountry.flags}
              alt={detailCountry.name}
            />
          </div>

          <div className={styles.details}>
            <p>
              <strong>ID:</strong> {detailCountry.id}
            </p>
            <p>
              <strong>CAPITAL:</strong> {detailCountry.capital}
            </p>
            <p>
              <strong>POPULATION:</strong> {detailCountry.population}
            </p>
            <p>
              <strong>AREA:</strong> {detailCountry.area} m²
            </p>
            <p>
              <strong>CONTINENT:</strong> {detailCountry.continents}
            </p>
            <p>
              <strong>SUBREGION:</strong> {detailCountry.subregion}
            </p>
            <div>
              {detailCountry.activities.length ? (
                <p>
                  <strong>ACTIVITIES:</strong>
                  {detailCountry.activities.map((activity, index) => {
                    return (
                      <>
                        <React.Fragment key={activity.id}>
                          <p>{activity.name}</p>
                          {index < detailCountry.activities.length - 1 && " "}
                        </React.Fragment>
                      </>
                    );
                  })}
                </p>
              ) : (
                <>{`No activities at the moment`}</>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <img src={loading} alt="loading" />
        </div>
      )}
      <div className={styles.detailcontainerlink}>
        <button>
          <Link to="/home" className={styles.LinkNavBar}>
            ⬅BACK TO HOMEPAGE
          </Link>
        </button>
        <button>
          <Link to="/create" className={styles.LinkNavBar}>
            CREATE YOUR ACTIVITY 📝
          </Link>
        </button>
      </div>
    </div>
  );
}
