import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";


import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

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
          {/* navigate is used when we want to go from one element
          to another without any link(it is a hook) */}
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="countries"  element={<CountryList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities/:id" element={<City />}/>
          <Route path="form" element={<Form />}/>

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
