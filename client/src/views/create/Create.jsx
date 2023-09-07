import { useState } from "react";
import { validate } from "./validateForm";
import { useDispatch } from "react-redux";
import { postActivity } from "../../redux/actions/actions";
import NavBar from "../../components/navBar/NavBar";

import styles from "./Create.module.css";

export default function Create() {
  const dispatch = useDispatch();

  //! ESTADO PARA EL INPUT

  const [input, setInput] = useState({
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

  // //! TRAEMOS LOS PAISES PARA HACER EL SELECT SIMULTÁNEO DE DIFERENTES PAISES PARA LA ACTIVIDAD CREADA
  // const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   async function fetchCountries() {
  //     try {
  //       const response = await fetch("http://localhost:3001/countries");
  //       const data = await response.json();
  //       setCountries(data);
  //       console.log(countries);
  //     } catch (error) {
  //       console.error("Error fetching countries:", error);
  //     }
  //   }
  //   fetchCountries();
  // }, []);

  //!HANDLER DE LOS CAMBIOS EN EL INPUT AL LLENAR EL FORMULARIO
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newInput = {
      ...input,
      [name]: value,
    };
    console.log("Input in real time:", newInput); // INPUT QUE SE HACE EN TIEMPO REAL
    const newErrors = validate(newInput, name, errors);
    setInput(newInput);
    setErrors(newErrors);
  };

  //! HANDLER DEL SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [""],
    });
  };

  //!BOTÓN QUE HABILITA EL SUBMIT SI PASAN LAS VALIDACIONES

  const disabledSubmitButton = () => {
    let disable = true;
    console.log(" first value fo disable:", disable); // VALOR DE DISABLE ANTES DE CHECAR ERRORES

    // errors
    for (let error in errors) {
      if (errors[error] !== "") {
        break;
      }
    }
    // inputs
    for (let field in input) {
      if (input[field] !== "" && field !== "countries") {
        break;
      }
    }
    // select
    const selectFields = ["difficulty", "season"];
    for (let field of selectFields) {
      if (input[field] === "") {
        break;
      }
    }
    // ok
    {
      console.log("Last value fo disable:", disable); // VALOR DE DISABLE PARA HABILITAR BOTÓN
    }

    return disable;
  };

  return (
    <div>
      <NavBar />
      <div className={styles.formcontainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.forminput}>
            <label>Name of the activity*</label>
            <input
              placeholder="Name your activity here ..."
              name="name"
              onChange={handleChange}
              type="text"
            />
            <p>{errors.name}</p>
          </div>
          <div className={styles.forminput}>
            <label>Difficulty*</label>
            <select name="difficulty" onChange={handleChange}>
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
              onChange={handleChange}
              type="text"
            />
            <p>{errors.duration}</p>
          </div>
          <div className={styles.forminput}>
            <label>Season*</label>
            <select name="season" onChange={handleChange}>
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
            <input
              placeholder="Countries here ..."
              name="countries"
              onChange={handleChange}
              type="text"></input>
          </div>

          <div className={styles.buttonsubmit}>
            <button disabled={disabledSubmitButton()} type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
