export default function Filters({ categories, ingredients, chosen, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        className="border rounded-xl px-3 py-2"
        value={chosen.category || ""}
        onChange={(e) =>
          onChange({ ...chosen, category: e.target.value || null })
        }
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="border rounded-xl px-3 py-2"
        value={chosen.ingredient || ""}
        onChange={(e) =>
          onChange({ ...chosen, ingredient: e.target.value || null })
        }
      >
        <option value="">All Ingredients</option>
        {ingredients.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}
