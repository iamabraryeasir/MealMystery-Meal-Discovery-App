import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  mealIds: string[];
}

const initialState: BookmarkState = {
  mealIds: JSON.parse(localStorage.getItem("bookmarkedMealIds") || "[]"),
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<string>) => {
      if (!state.mealIds.includes(action.payload)) {
        state.mealIds.push(action.payload);
        localStorage.setItem(
          "bookmarkedMealIds",
          JSON.stringify(state.mealIds)
        );
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.mealIds = state.mealIds.filter((id) => id !== action.payload);
      localStorage.setItem("bookmarkedMealIds", JSON.stringify(state.mealIds));
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
