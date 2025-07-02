import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Meal } from "../../types/meal.type";

interface MealsResponse {
  meals: Meal[] | null;
}

// interface CategoriesResponse {
//   categories: Array<{ strCategory: string }>;
// }

export const mealsApiSlice = createApi({
  reducerPath: "mealsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1",
  }),
  endpoints: (builder) => ({
    getRandomMeal: builder.query<MealsResponse, void>({
      query: () => "/random.php",
    }),
    getMealById: builder.query<MealsResponse, string>({
      query: (id) => `/lookup.php?i=${id}`,
    }),
    getAllCategories: builder.query<{ meals: { strCategory: string }[] }, void>(
      {
        query: () => `/list.php?c=list`,
      }
    ),
    getMealByCategory: builder.query<MealsResponse, string>({
      query: (category) => `/filter.php?c=${category}`,
    }),
    searchMealsByName: builder.query<MealsResponse, string>({
      query: (name) => `/search.php?s=${name}`,
    }),
  }),
});

export const {
  useGetRandomMealQuery,
  useGetMealByIdQuery,
  useGetMealByCategoryQuery,
  useGetAllCategoriesQuery,
  useSearchMealsByNameQuery,
} = mealsApiSlice;
