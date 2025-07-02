import { Clock, LoaderCircle, MapPin } from "lucide-react";
import { Link } from "react-router";

import type { Meal } from "../../types/meal.type";
import { useGetMealByIdQuery } from "../../states/api/mealApi";

export default function MealCard({
  mealId,
  className = "",
}: {
  mealId: string;
  className: string;
}) {
  const { data, isLoading } = useGetMealByIdQuery(mealId);
  const meal = data?.meals?.[0];

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 10; i++) {
      const ingredient = meal?.[`strIngredient${i}` as keyof Meal];
      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient);
      }
    }
    return ingredients.slice(0, 3);
  };

  if (isLoading) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full ${className}`}
      >
        <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
          <LoaderCircle className="animate-spin w-8 h-8 text-orange-500" />
        </div>
      </div>
    );
  }

  return (
    <Link to={`/meals/${meal?.idMeal}`}>
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col h-full ${className}`}
      >
        <div className="relative overflow-hidden aspect-[4/3] w-full rounded-t-2xl bg-gray-100">
          <img
            src={meal?.strMealThumb}
            alt={meal?.strMeal}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {meal?.strMeal}
          </h3>
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>{meal?.strArea}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>{meal?.strCategory}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {getIngredients().map((ingredient, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                >
                  {ingredient}
                </span>
              ))}
              {getIngredients().length > 0 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +more
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {meal?.strInstructions}
          </p>
        </div>
      </div>
    </Link>
  );
}
