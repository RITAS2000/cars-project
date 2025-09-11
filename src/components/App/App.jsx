import { Route, Routes } from "react-router-dom";
import Loyaut from "../Loyaut/Loyaut.jsx";
// import MainPage from "../../pages/MainPage/MainPage.jsx";
// import CarsPage from "../../pages/CarsPage/CarsPage.jsx";
// import CarsPageById from "../../pages/CarsPageById/CarsPageById.jsx";
import { lazy, Suspense } from "react";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const CarsPage = lazy(() => import("../../pages/CarsPage/CarsPage.jsx"));
const CarsPageById = lazy(() =>
  import("../../pages/CarsPageById/CarsPageById.jsx")
);

export default function App() {
  return (
    <Loyaut>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarsPageById />} />
        </Routes>
      </Suspense>
    </Loyaut>
  );
}
