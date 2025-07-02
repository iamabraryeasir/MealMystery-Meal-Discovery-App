import { configureStore } from "@reduxjs/toolkit";
import { mealsApiSlice } from "./api/mealApi";
import bookmarkReducer from "./slices/bookmarkSlice";

export const store = configureStore({
  reducer: {
    [mealsApiSlice.reducerPath]: mealsApiSlice.reducer,
    bookmark: bookmarkReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(mealsApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
