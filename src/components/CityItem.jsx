/* eslint-disable react/prop-types */
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));


    function handleDelete(e){
      e.preventDefault();
      console.log("deleting", id)
      deleteCity(id)
    }
  return (
    <li>
      {/* in this case it attaches the id to the existent url
        but if we give `/${id}`  it will go to root then attaches
         the id*/}
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ` `
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={e=>handleDelete(e)}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
