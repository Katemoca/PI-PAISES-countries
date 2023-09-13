/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { validate } from "./validateForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  postActivity,
  getAllActivities,
  putActivity,
} from "../../redux/actions/actions";
import NavBar from "../../components/navBar/NavBar";

import styles from "./Create.module.css";

export default function Create() {
  const dispatch = useDispatch(); // Para despachar las action creator
  const countries = useSelector((state) => state.countries); // Para subscribir el componente una parte del estado que se necesita
  const allActivities = useSelector((state) => state.activities); // Para subscribir el componente una parte del estado que se necesita

  //! ESTADO PARA EL INPUT
  const [form, setform] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  //! ESTADO PARA LOS ERRORES
  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  //! USE EFFECT PARA TRAER PAISES Y ACTIVIDADES EXISTENTES AL COMPONENTE CUANDO SE MONTA
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, []);

  //!HANDLER DE LOS CAMBIOS EN EL form AL LLENAR EL FORMULARIO
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setform({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value }));
  };

  //!HANDLER PARA ELIMINAR A UN PAIS
  const handleDelete = (event) => {
    setform({
      ...form,
      countries: form.countries.filter((country) => country !== event),
    });
  };

  // //! USE EFFECT PARA VALIDAR DATOS DE FORMA ASÍNCRONA PERO A TODOS
  // useEffect(() => {
  //   const newErrors = validate(form);
  //   setErrors(newErrors);
  // }, [form]);

  //!HANDLER PARA LOS SELECT
  const handleSelect = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property === "difficulty" || property === "season") {
      setform({
        ...form,
        [property]: value,
      });
    } else if (property === "countries") {
      if (form.countries.includes(value)) return;
      setform({ ...form, countries: [...form.countries, value] });
    }
    setErrors(validate({ ...form, [property]: value }));
  };

  //! HANDLER DEL SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si una actividad ya existe (método "some" para ver si alguna actividad ya existe)
    const activityExists = allActivities.some(
      (activity) => activity.name === form.name
    );

    if (activityExists) {
      return alert("An activity with the same name already exists");
    }

    if (
      !form.name ||
      !form.difficulty ||
      !form.duration ||
      !form.season ||
      form.countries.length === 0
    ) {
      return alert("Please complete all fields");
    }
    dispatch(postActivity(form));
    //Limpiamos los forms después del submit
    setform({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  };

  console.log("ESTE ES EL INPUT", form);

  //! Botón para habilitar o deshabilitar el submit (hay que agregarle la propiedad "disabled" con la función ejecutada)

  const disableButton = () => {
    let disabled;
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true;
        break;
      }
    }
    return disabled;
  };

  return (
    <div>
      <NavBar />
      <div className={styles.formcontainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.forminput}>
            <label htmlFor="name">Name of the activity*</label>
            <input
              placeholder="Name your activity here ..."
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
            />
            <p>{errors.name}</p>
          </div>

          <div className={styles.forminput}>
            <label>Difficulty*</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleSelect}>
              <option value="" disabled defaultValue>
                Select Difficulty
              </option>
              <option key="1" value="1">
                1 - Easy 😊
              </option>
              <option key="2" value="2">
                2 - Moderate 🙂
              </option>
              <option key="3" value="3">
                3 - Intermediate 😉
              </option>
              <option key="4" value="4">
                4 - Challenging 😐
              </option>
              <option key="5" value="5">
                5 - Difficult 🥴
              </option>
            </select>
            <p>{errors.difficulty}</p>
          </div>

          <div className={styles.forminput}>
            <label>Duration in hours*</label>
            <input
              placeholder="Duration (in hours)"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              type="text"
            />
            <p>{errors.duration}</p>
          </div>

          <div className={styles.forminput}>
            <label>Season*</label>
            <select name="season" value={form.season} onChange={handleSelect}>
              <option value="" disabled defaultValue>
                Select Season
              </option>
              <option key="Spring" value="Spring">
                Spring 🌹
              </option>
              <option key="Summer" value="Summer">
                Summer 🏖️
              </option>
              <option key="Autumn" value="Autumn">
                Autumn 🍁
              </option>
              <option key="Winter" value="Winter">
                Winter ⛄
              </option>
            </select>
            <p>{errors.season}</p>
          </div>

          <div className={styles.forminput}>
            <label>Countries*</label>
            <select
              name="countries"
              id="countries"
              defaultValue="0"
              onChange={handleSelect}>
              <option value="0" disabled>
                Select a country
              </option>
              {countries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
            <p>{errors.countries}</p>
          </div>

          {/* PARA NO MOSTRAR EL SUBMIT SI HAY ERRORES: 
          {errors.name ||
          errors.difficulty ||
          errors.duration ||
          errors.season ||
          errors.countries ? null : (
            <div className={styles.buttonsubmit}>
              <button type="submit">SUBMIT</button>
            </div>
          )} */}

          <div className={styles.buttonsubmit}>
            <button type="submit" disabled={disableButton()}>
              SUBMIT
            </button>
          </div>

          <div className={styles.countryList}>
            {form.countries.map((country) => {
              return (
                <div className={styles.countries} key={country.id}>
                  <p key={country.id}>{country}</p>
                  <button
                    key={country.id}
                    className={styles.delete}
                    onClick={() => handleDelete(country)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
