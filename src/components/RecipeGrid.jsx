import RecipeCard from './RecipeCard'

export default function RecipeGrid({ meals }){
  if(!meals?.length) return <p className="text-slate-500">No recipes found.</p>
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {meals.map(m => <RecipeCard key={m.id} meal={m} />)}
    </div>
  )
}
