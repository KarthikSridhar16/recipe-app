import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";
import {
  searchMealsByName,
  listCategories,
  listIngredients,
  listAreas,
  filterBy,
  filterByArea,
} from "../services/api";
import { mapMealCard } from "../utils/mapMeal";
import HeroCuisine from "../components/HeroCuisine";

export default function Home() {
  const [q, setQ] = useState("");
  const [chosen, setChosen] = useState({
    area: null,
    category: null,
    ingredient: null,
  });

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [areas, setAreas] = useState([]);
  const [cats, setCats] = useState([]);
  const [ings, setIngs] = useState([]);

  useEffect(() => {
    listAreas().then(setAreas);
    listCategories().then(setCats);
    listIngredients().then(setIngs);
  }, []);
  async function loadDiscover() {
    setLoading(true);
    try {
      let categories = cats;
      if (!categories || categories.length === 0) {
        categories = await listCategories();
      }
      const fallbackCats = ["Beef", "Chicken", "Seafood", "Vegetarian"];
      const pool = (categories && categories.length ? categories : fallbackCats).slice();
      const pick = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
      const chosenCats = pick(pool, 4);
      const byCat = await Promise.all(
        chosenCats.map((c) => filterBy({ category: c }))
      );
      const flat = byCat.flat();
      setMeals(flat.slice(0, 12).map(mapMealCard));
    } finally {
      setLoading(false);
    }
  }
  async function handleSearch(e, preset) {
    e.preventDefault();
    setLoading(true);
    try {
      const query = preset ?? q;
      let results = [];

      if (query) {
        results = await searchMealsByName(query);
      } else if (chosen.area) {
        results = await filterByArea(chosen.area);
      } else if (chosen.category || chosen.ingredient) {
        results = await filterBy({
          category: chosen.category,
          ingredient: chosen.ingredient,
        });
      } else {
        await loadDiscover();
        return;
      }

      setMeals(results.map(mapMealCard));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadDiscover();
  }, []);

  useEffect(() => {
    if (q) return;
    if (chosen.area || chosen.category || chosen.ingredient) {
      setLoading(true);
      (async () => {
        let r = [];
        if (chosen.area) {
          r = await filterByArea(chosen.area);
        } else {
          r = await filterBy({
            category: chosen.category,
            ingredient: chosen.ingredient,
          });
        }
        setMeals(r.map(mapMealCard));
        setLoading(false);
      })();
    } else {
      loadDiscover();
    }
  }, [chosen.area, chosen.category, chosen.ingredient]);

  return (
    <>
      <div className="bleed-x">
        <HeroCuisine />
      </div>

      <div className="bleed-x recipe-bg">
        <section className="container mx-auto px-4 space-y-8 py-6" id="recipes">
          <div className="bg-white/90 backdrop-blur rounded-2xl ring-1 ring-slate-200/50 p-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <SearchBar value={q} onChange={setQ} onSubmit={handleSearch} />

              <div className="flex flex-wrap gap-3">
                <select
                  className="border rounded-xl px-3 py-2"
                  value={chosen.area || ""}
                  onChange={(e) =>
                    setChosen({ ...chosen, area: e.target.value || null })
                  }
                >
                  <option value="">All Cuisines</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded-xl px-3 py-2"
                  value={chosen.category || ""}
                  onChange={(e) =>
                    setChosen({ ...chosen, category: e.target.value || null })
                  }
                >
                  <option value="">All Categories</option>
                  {cats.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded-xl px-3 py-2"
                  value={chosen.ingredient || ""}
                  onChange={(e) =>
                    setChosen({
                      ...chosen,
                      ingredient: e.target.value || null,
                    })
                  }
                >
                  <option value="">All Ingredients</option>
                  {ings.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <RecipeGrid meals={meals} />
          )}
        </section>
      </div>
    </>
  );
}
