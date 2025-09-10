import { Route, Routes } from "react-router-dom";
import Loyaut from "../Loyaut/Loyaut.jsx";
import MainPage from "../../pages/MainPage/MainPage.jsx";
import CarsPage from "../../pages/CarsPage/CarsPage.jsx";
import CarsPageById from "../../pages/CarsPageById/CarsPageById.jsx";

export default function App() {
  return (
    <Loyaut>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarsPageById />} />
      </Routes>
    </Loyaut>
  );
}
