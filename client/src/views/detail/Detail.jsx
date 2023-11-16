/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, getCountryDetail } from "../../redux/actions/actions";

import styles from "./Detail.module.css";
import loading from "../../assets/loading/greenshape.gif";

export default function Detail() {
  const { detailId } = useParams();
  const dispatch = useDispatch();
  const detailCountry = useSelector((state) => state.detailCountries);

  useEffect(() => {
    dispatch(getCountryDetail(detailId));
    return () => {
      dispatch(cleanDetail());
    };
  }, [detailId]);

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
                <li>
                  <strong>ACTIVITIES:</strong>
                  {detailCountry.activities.map((activity, index) => {
                    const actName = activity.name;
                    return (
                      <>
                        <Link
                          className={styles.link}
                          key={activity.name}
                          to={{
                            pathname: `/activities/${actName}`,
                            search: `?detailId=${detailId}`,
                          }}>
                          {activity.name}
                        </Link>
                        {index < detailCountry.activities.length - 1 && " "}
                      </>
                    );
                  })}
                </li>
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
