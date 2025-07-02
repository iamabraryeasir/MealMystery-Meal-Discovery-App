import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="max-w-2xl mx-auto pb-4 md:pb-6 px-5 lg:px-0">
      <div className="px-4 md:px-6 py-3 md:py-3.5 flex items-center gap-3 md:gap-5 text-lg bg-white border border-orange-200 rounded-2xl text-gray-800 shadow-md focus-within:ring-2 focus-within:ring-orange-400 transition-all duration-300">
        <label htmlFor="searchBox" className="text-orange-500">
          <Search />
        </label>
        <input
          id="searchBox"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search for delicious meals..."
          className="w-full focus:border-transparent focus:outline-none placeholder-orange-300 bg-transparent text-gray-800"
        />
      </div>
    </div>
  );
}
