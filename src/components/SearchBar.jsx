export default function SearchBar({ value, onChange }) {
  return (
    <>
      <label htmlFor="q" className="sr-only">Search recipes</label>
      <input
        id="q"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes by name..."
        className="flex-1 min-w-0 rounded-xl border px-3 py-2"
      />
      <button type="submit" className="rounded-xl bg-emerald-500 text-white px-4 py-2">
        Search
      </button>
    </>
  );
}
