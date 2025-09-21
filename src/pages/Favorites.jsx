// src/pages/Favorites.jsx
import { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import { getMealById } from "../services/api";
import { mapMealCard } from "../utils/mapMeal";
import RecipeGrid from "../components/RecipeGrid";

export default function Favorites() {
  const { favs } = useFavorites();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const out = await Promise.all(
          favs.map(async (id) => {
            const full = await getMealById(id);
            return full ? mapMealCard(full) : null;
          })
        );
        if (!cancelled) setMeals(out.filter(Boolean));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [favs]);

  return (
    <section className="container mx-auto px-4 space-y-8 mt-6 mb-10">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Your Favorites</h1>
        <span className="text-sm text-slate-500">{favs.length} saved</span>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : favs.length === 0 ? (
        <p className="text-slate-600">
          You haven’t saved any recipes yet. Tap the heart on a recipe to add it here.
        </p>
      ) : (
        <RecipeGrid meals={meals} />
      )}
    </section>
  );
}
