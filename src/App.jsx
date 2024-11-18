import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";

const BASE_URL = "http://localhost:9000"
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }catch{
        console.log("error")
      }finally{
        setIsLoading(false)
      }
    }
    fetchCities();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />

        <Route path="/app" element={<AppLayout />} >
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="countries"  element={<p>countries</p>}/>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="form" element={<p>form</p>}/>
        </Route>

        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="/" element={<Home/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
