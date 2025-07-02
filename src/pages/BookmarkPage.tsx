import { useAppSelector, useAppDispatch } from "../states/hooks";
import MealCard from "../components/common/MealCard";
import { removeBookmark } from "../states/slices/bookmarkSlice";

export default function BookmarkPage() {
  const mealIds = useAppSelector((state) => state.bookmark.mealIds);
  const dispatch = useAppDispatch();

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bookmarked Meals
      </h1>
      {mealIds.length === 0 ? (
        <div className="text-gray-500 text-lg text-center mt-16">
          No meals bookmarked yet.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mealIds.map((mealId) => (
            <li key={mealId} className="flex relative group">
              <MealCard
                mealId={mealId}
                className="flex-1 h-full flex flex-col"
              />
              <button
                onClick={() => dispatch(removeBookmark(mealId))}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-red-100 text-red-500 shadow transition-all opacity-0 group-hover:opacity-100"
                aria-label="Remove from bookmarks"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
