import { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useGetMealByCategoryQuery,
} from "../../states/api/mealApi";
import { useFeaturedMeals } from "../../hooks/useFeaturedMeals";
import { LoaderCircle } from "lucide-react";
import MealCarousel from "../others/MealCarousel";

export default function BrowseByCategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data } = useGetAllCategoriesQuery();
  const mealCategories = data?.meals;

  // Fetch meals for the selected category
  const { data: mealsData, isLoading: isCategoryLoading } =
    useGetMealByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  // Fetch featured meals (8 random meals)
  const { meals: featuredMeals, isLoading: isFeaturedLoading } =
    useFeaturedMeals(8);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Decide which meals to show
  const showMeals = selectedCategory ? mealsData?.meals : featuredMeals;
  const loading = selectedCategory ? isCategoryLoading : isFeaturedLoading;

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
                loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
              }`}
              disabled={loading}
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        {/* Display meals for the selected category or featured */}
        <div className="mt-6">
          {loading ? (
            <div className="w-full h-[60vh] flex items-center justify-center">
              <LoaderCircle className="animate-spin w-10 h-10 text-orange-500" />
            </div>
          ) : selectedCategory ? (
            showMeals &&
            showMeals.length > 0 && (
              <MealCarousel
                meals={showMeals}
                title={`Meals in ${selectedCategory}`}
              />
            )
          ) : (
            featuredMeals.length > 0 && (
              <MealCarousel meals={featuredMeals} title="Featured Meals" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
