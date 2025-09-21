import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

export default function RecipeCard({ meal }) {
  const { favs, toggle } = useFavorites();
  const isFav = favs.includes(meal.id);

  return (
    <div className="group relative rounded-2xl overflow-hidden border bg-white hover:shadow-md transition">
      <Link to={`/recipe/${meal.id}`}>
        <img
          src={meal.thumb}
          alt={meal.name}
          className="w-full aspect-video object-cover"
        />
      </Link>

      <button
        className={`fav-btn ${isFav ? "fav-on" : ""}`}
        onClick={() => toggle(meal.id)}
        aria-label="Toggle Favorite"
        title={isFav ? "Remove from favorites" : "Save to favorites"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeWidth="1.5"
            d="M12 21s-5.052-3.148-7.5-5.596C2.5 13.404 2 11.5 2 10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 1.5-.5 3.404-2.5 5.404C17.052 17.852 12 21 12 21Z"
          />
        </svg>
      </button>

      <div className="p-4">
        <p className="text-xs text-slate-500">{meal.category}</p>
        <Link
          to={`/recipe/${meal.id}`}
          className="font-semibold group-hover:text-emerald-600"
        >
          {meal.name}
        </Link>
      </div>
    </div>
  );
}
