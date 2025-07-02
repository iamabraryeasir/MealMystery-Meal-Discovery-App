import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="max-w-2xl mx-auto pb-4 md:pb-6 px-5 lg:px-0">
      <div className="px-4 md:px-6 py-3 md:py-3.5 flex items-center gap-3 md:gap-5 text-lg bg-white/10 backdrop-blur-sm border border-orange-200/30 rounded-2xl text-white transition-all duration-300">
        <label htmlFor="searchBox">
          <Search />
        </label>
        <input
          id="searchBox"
          type="text"
          // value={searchQuery}
          // onChange={handleSearch}
          placeholder="Search for delicious meals..."
          className="w-full focus:border-transparent focus:outline-none placeholder-orange-200 bg-transparent"
        />
      </div>
    </div>
  );
}
