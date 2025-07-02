import { Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useGetRandomMealQuery } from "../../states/api/mealApi";
import type { Meal } from "../../types/meal.type";

export default function HeroSection() {
  const { data, refetch, isLoading } = useGetRandomMealQuery();
  const randomMeal: Meal | undefined = data?.meals?.[0];

  const handleTryAnother = () => {
    refetch();
  };

  return (
    <section className="py-5 md:py-8 px-5 md:px-0">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 md:p-8 text-white flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10">
        {isLoading ? (
          <div className="w-full md:h-96 flex items-center justify-center">
            <Loader2 className="w-20 h-20 animate-spin" />
          </div>
        ) : (
          <>
            <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-7">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg font-semibold">Meal of the Day</span>
              </div>
              <h2 className="text-4xl font-bold">{randomMeal?.strMeal}</h2>
              <p className="text-orange-100">
                {randomMeal?.strInstructions.substring(0, 300)}...
              </p>
              <div className="w-full justify-between md:justify-start flex gap-4">
                <Link
                  to={`/meals/${randomMeal?.idMeal}`}
                  className="px-6 py-3 bg-white text-orange-500 rounded-2xl font-semibold hover:bg-orange-50 transition-all duration-300 hover:shadow-lg"
                >
                  View Recipe
                </Link>
                <button
                  onClick={handleTryAnother}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                >
                  Try Another
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img
                src={randomMeal?.strMealThumb}
                alt="Random Image"
                className="w-full md:h-96 object-cover rounded-2xl"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
