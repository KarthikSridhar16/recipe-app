import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getMealById } from "../services/api";

function getIngredientThumb(name, size = "Small") {
  if (!name) return "";
  const safe = encodeURIComponent(name.trim());
  return `https://www.themealdb.com/images/ingredients/${safe}-${size}.png`;
}

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      const m = await getMealById(id);
      if (!cancel) {
        setMeal(m);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    })();
    return () => { cancel = true; };
  }, [id]);

  const ingredients = useMemo(() => {
    if (!meal) return [];
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        list.push({
          name: ing.trim(),
          measure: (meas || "").trim(),
          img: getIngredientThumb(ing, "Small"),
        });
      }
    }
    return list;
  }, [meal]);

  if (loading) {
    return (
      <div className="details-shell">
        <div className="container mx-auto px-4 py-16">
          <div className="h-8 w-48 rounded bg-slate-200 mb-6" />
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="w-full h-[54svh] rounded-3xl bg-slate-100 animate-pulse" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-7 w-72 rounded bg-slate-200" />
              <div className="h-28 w-full rounded bg-slate-100" />
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-28 rounded-2xl bg-slate-100" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="details-shell">
        <div className="container mx-auto px-4 py-16">
          <p className="text-slate-600">Couldn’t load this recipe.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Go back
          </button>
        </div>
      </div>
    );
  }

  const instructionParas = (meal.strInstructions || "")
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className="details-shell">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-back"
            aria-label="Back to list"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to list
          </Link>

          <div className="ml-auto flex items-center gap-2 text-xs sm:text-sm">
            <span className="pill">{meal.strArea}</span>
            <span className="pill">{meal.strCategory}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
          {meal.strMeal}
        </h1>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative">
              <div className="dish-glow" />
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="relative z-[1] w-full rounded-3xl shadow-xl object-cover"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-5 space-y-8">
            <section>
              <h2 className="section-title">Ingredients</h2>
              <ul className="ingredient-grid">
                {ingredients.map((it) => (
                  <li key={it.name} className="ingredient-card">
                    <img src={it.img} alt={it.name} className="ingredient-img" />
                    <div className="mt-2 text-sm font-medium">{it.name}</div>
                    {it.measure && (
                      <div className="text-xs text-slate-500">{it.measure}</div>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="section-title">Instructions</h2>
              <div className="prose prose-slate max-w-none [&>p]:mb-3">
                {instructionParas.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-yt"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a4.5 4.5 0 00-3.2-3.2C18.6 2.5 12 2.5 12 2.5s-6.6 0-8.3.5A4.5 4.5 0 00.5 6.2 47.6 47.6 0 000 12a47.6 47.6 0 00.5 5.8 4.5 4.5 0 003.2 3.2c1.7.5 8.3.5 8.3.5s6.6 0 8.3-.5a4.5 4.5 0 003.2-3.2c.5-1.7.5-5.8.5-5.8s0-4.1-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z"/>
                  </svg>
                  Watch on YouTube
                </a>
              )}

              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-link"
                >
                  Full source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
