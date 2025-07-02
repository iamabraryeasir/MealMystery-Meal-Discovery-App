import { Link, useParams } from "react-router";
import { useGetMealByIdQuery } from "../states/api/mealApi";
import { ArrowLeft, Bookmark, ChefHat, LoaderCircle } from "lucide-react";

export default function MealDetailPage() {
  const { mealId } = useParams<{ mealId: string }>();

  const { data, isLoading } = useGetMealByIdQuery(mealId!);
  const selectedMeal = data?.meals === null ? undefined : data?.meals?.[0];

  // Split instructions into steps
  const getInstructions = () => {
    if (!selectedMeal?.strInstructions) return [];
    return selectedMeal.strInstructions
      .split(".")
      .filter((step) => step.trim())
      .map((step) => step.trim() + ".");
  };

  // Extract ingredients from meal object
  const getIngredients = () => {
    if (!selectedMeal) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient =
        selectedMeal[`strIngredient${i}` as keyof typeof selectedMeal];
      const measure =
        selectedMeal[`strMeasure${i}` as keyof typeof selectedMeal];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  const instructions = getInstructions();
  const ingredients = getIngredients();

  // handling loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-gray-600">
            <LoaderCircle className="w-6 h-6 animate-spin" />
            <span>Loading meal details...</span>
          </div>
        </div>
      </div>
    );
  }

  // handling meal not found
  if (selectedMeal === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="text-center py-20">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Meal not found
          </h1>
          <p className="text-gray-600 mb-6">
            The meal you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // main component
  return (
    <>
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Meal Header */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={selectedMeal?.strMealThumb}
              alt={selectedMeal?.strMeal}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                // onClick={handleBookmark}
                className={`p-3 rounded-full transition-all duration-300 bg-orange-500 text-white`}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    // isBookmarked(selectedMeal.strMeal) ? "fill-current" : ""
                    ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {selectedMeal?.strMeal}
                </h1>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  {selectedMeal?.strCategory || "Main Course"}
                </span>
              </div>
            </div>

            {selectedMeal?.strTags && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMeal.strTags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ingredients
            </h2>
            <div className="space-y-3">
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-gray-800">
                    {item.measure} {item.ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Instructions
            </h2>
            <div className="space-y-4">
              {instructions.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section */}
        {selectedMeal?.strYoutube && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Video Tutorial
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={selectedMeal?.strYoutube.replace("watch?v=", "embed/")}
                title={`${selectedMeal?.strMeal} Tutorial`}
                className="w-full h-full"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              ></iframe>
            </div>
          </div>
        )}

        {/* Source Link */}
        {selectedMeal?.strSource && (
          <div className="mt-8 text-center">
            <a
              href={selectedMeal?.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-2xl font-semibold hover:bg-gray-700 transition-colors"
            >
              View Original Recipe
            </a>
          </div>
        )}
      </div>
    </>
  );
}
