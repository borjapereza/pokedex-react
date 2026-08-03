import { Route, Routes } from "react-router-dom";
import Layout from "../templates/Layout";
import PokemonDetail from "../pages/PokemonDetail/PokemonDetail";
import Home from "../pages/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Route>
    </Routes>
  );
}
