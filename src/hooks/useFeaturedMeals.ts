import { useEffect, useState } from "react";
import { useGetRandomMealQuery } from "../states/api/mealApi";
import type { Meal } from "../types/meal.type";

export function useFeaturedMeals(count: number = 8) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const [fetchIndex, setFetchIndex] = useState(0);

  const { refetch } = useGetRandomMealQuery(undefined);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetchMeals = async () => {
      const fetchedMeals: Meal[] = [];
      const ids = new Set();
      let attempts = 0;
      while (fetchedMeals.length < count && attempts < count * 5) {
        const result = await refetch();
        const meal = result.data?.meals?.[0];
        if (meal && !ids.has(meal.idMeal)) {
          fetchedMeals.push(meal);
          ids.add(meal.idMeal);
        }
        attempts++;
      }
      if (isMounted) {
        setMeals(fetchedMeals);
        setLoading(false);
      }
    };
    fetchMeals();
    return () => {
      isMounted = false;
    };
  }, [count, fetchIndex, refetch]);

  const refresh = () => setFetchIndex((i) => i + 1);

  return { meals, isLoading: loading, refresh };
}
