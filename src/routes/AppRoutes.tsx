import { Route, Routes } from "react-router-dom";
import Layout from "../templates/Layout";
import PokemonDetail from "../pages/PokemonDetail/PokemonDetail";
import Home from "../pages/Home/Home";
import TypesPage from "../pages/TypesPage/TypesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/tipos" element={<TypesPage />} />
      </Route>
    </Routes>
  );
}
