import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const[searchParams, setSearchParams] = useSearchParams();

  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  const navigate = useNavigate();

  return <div onClick={()=>navigate("form")} className={styles.mapContainer}>
    
    map {lng, lat}</div>;
}

export default Map;
