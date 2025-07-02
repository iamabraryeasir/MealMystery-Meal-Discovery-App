import { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useGetMealByCategoryQuery,
} from "../../states/api/mealApi";
import MealCard from "../common/MealCard";

export default function BrowseByCategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data } = useGetAllCategoriesQuery();
  const mealCategories = data?.meals;

  // Fetch meals for the selected category
  const { data: mealsData, isLoading } = useGetMealByCategoryQuery(
    selectedCategory,
    {
      skip: !selectedCategory,
    }
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto">
      <div className="px-5 md:px-0">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Browse by Category
        </h3>
        <div className="flex flex-wrap gap-3">
          {mealCategories?.slice(0, 12).map((category) => (
            <button
              key={category.strCategory}
              onClick={() => handleCategoryClick(category.strCategory)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.strCategory
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-200"
              } ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
              }`}
              disabled={isLoading}
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        {/* Display meals for the selected category */}
        {selectedCategory && (
          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-2">
              Meals in {selectedCategory}
            </h4>
            {isLoading && <div>Loading meals...</div>}
            {!isLoading && mealsData?.meals && (
              <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {mealsData.meals.slice(0, 8).map((meal) => (
                  <li key={meal.idMeal} className="flex">
                    <MealCard
                      mealId={meal.idMeal}
                      className="flex-1 h-full flex flex-col"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
