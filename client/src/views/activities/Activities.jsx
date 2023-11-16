/* eslint-disable react-hooks/exhaustive-deps */
// import styles from "./Activities.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteActivity, getAllActivities } from "../../redux/actions/actions";

function Activities() {
  const dispatch = useDispatch();
  const activitiesData = useSelector((state) => state.activities);

  //! Traemos todas las actividades a través de la action
  useEffect(() => {
    dispatch(getAllActivities());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteActivity(id));
    alert("Activity deleted");
  };

  return (
    <>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        {activitiesData.map((act, index) => (
          <div key={index}>
            <button onClick={() => handleDelete(act.id)}></button>
            <h5>{act.name}</h5>
            <Link
              to={{
                pathname: `/create`,
                search: `id=${act.id}&name=${act.name}&difficulty=${
                  act.dificulty
                }&duration=${act.duration}&season=${
                  act.season
                }&countries=${JSON.stringify(act.countries)}`,
              }}>
              Edit
            </Link>
            <Link to={`/activities/${act.name}`}>Detail</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Activities;
