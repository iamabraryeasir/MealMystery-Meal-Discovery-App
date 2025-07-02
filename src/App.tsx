import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import MealDetailPage from "./pages/MealDetailPage";
import Navbar from "./components/common/Navbar";
import BrowseMealsPage from "./pages/BrowseMealsPage";
import BookmarkPage from "./pages/BookmarkPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meals" element={<BrowseMealsPage />} />
        <Route path="/meals/:mealId" element={<MealDetailPage />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />
      </Routes>
    </>
  );
}
