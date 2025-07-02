import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import MealDetailPage from "./pages/MealDetailPage";
import Navbar from "./components/common/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meals/:mealId" element={<MealDetailPage />} />
      </Routes>
    </>
  );
}
