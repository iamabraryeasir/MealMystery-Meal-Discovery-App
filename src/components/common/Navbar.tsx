import { Bookmark, ChefHat, Search } from "lucide-react";
import { Link } from "react-router";
import { useAppSelector } from "../../states/hooks";

export default function Navbar() {
  const bookmarkCount = useAppSelector(
    (state) => state.bookmark.mealIds.length
  );

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Navbar */}
        <div className="px-5 lg:px-0 py-4 md:py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-bold text-3xl">
            <ChefHat className="w-10 h-10" />
            MealMystery
          </Link>

          <div className="flex items-center gap-5">
            <Link to="/meals" className="text-lg font-medium">
              <div className="md:hidden">
                <Search />
              </div>
              <p className="hidden md:block">Browse Meals</p>
            </Link>
            <Link
              to="/bookmarks"
              className="flex items-center gap-1 text-lg px-3 md:px-5 py-3 md:py-2 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer relative"
            >
              <Bookmark />
              <span className="hidden md:block">Bookmarks</span>
              {bookmarkCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
