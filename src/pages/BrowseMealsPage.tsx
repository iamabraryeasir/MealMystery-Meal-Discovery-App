import { useState } from "react";
import SearchBox from "../components/others/SearchBox";
import MealCard from "../components/common/MealCard";
import { useFeaturedMeals } from "../hooks/useFeaturedMeals";
import { useSearchMealsByNameQuery } from "../states/api/mealApi";
import { LoaderCircle } from "lucide-react";

export default function BrowseMealsPage() {
  const [search, setSearch] = useState("");
  const { meals: featuredMeals, isLoading: isFeaturedLoading } =
    useFeaturedMeals(8);
  const { data: searchData, isLoading: isSearchLoading } =
    useSearchMealsByNameQuery(search, { skip: !search });

  // Meals to show: search results if searching, else featured
  const showMeals = search ? searchData?.meals : featuredMeals;
  const loading = search ? isSearchLoading : isFeaturedLoading;

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
      <SearchBox value={search} onChange={handleSearch} />
      <div className="mt-6">
        {loading && (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <LoaderCircle className="animate-spin w-10 h-10 text-orange-500" />
          </div>
        )}
        {!loading && showMeals && showMeals.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {showMeals.slice(0, 8).map((meal) => (
              <li key={meal.idMeal} className="flex">
                <MealCard
                  mealId={meal.idMeal}
                  className="flex-1 h-full flex flex-col"
                />
              </li>
            ))}
          </ul>
        )}
        {!loading && (!showMeals || showMeals.length === 0) && (
          <div className="text-center text-gray-500 text-lg mt-8">
            {search
              ? `No meals found with the name "${search}".`
              : "No meals to display."}
          </div>
        )}
      </div>
    </div>
  );
}
