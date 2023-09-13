/* eslint-disable no-unused-vars */
import NavBar from "../../components/navBar/NavBar";
import CardsContainer from "../../components/cardsContainer/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountries } from "../../redux/actions/actions";

import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  //! PAGINADO LOCAL: Estados locales para saber cuál es la página en la que nos encontramos
  let cardsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(countries.length / cardsPerPage);

  // DEFINIMOS LA "CURRENTPAGE" Y EL INICIO Y FINAL DE CADA ARRAY POR PÁGINA
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  //APLICAMOS UN SLICE PARA CORTAR TODO EL ARRAY DE "COUNTRIES"
  const currentCountries = countries.slice(startIndex, endIndex);

  //HANDLERS PARA MANEJAR EVENTOS Y MOVERNOS ENTRE B0TONES DEL PAGINADO

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //! UseEffects (ciclos de vida del componente)
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div>
      <NavBar />

      <div className={styles.homecontainer}>
        <Pagination
          totalPages={totalPages}
          page={handlePage}
          currentPage={currentPage}
        />
        <div className={styles.textintro}>
          <p>{`Let's take a global tour to explore various countries and the immense possibilities for having fun. 🌎✈️ `}</p>
        </div>
        <div>
          <CardsContainer countries={currentCountries} />
        </div>
        <Pagination
          totalPages={totalPages}
          page={handlePage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
