export function mapMealCard(m){
  return {
    id: m.idMeal,
    name: m.strMeal,
    thumb: m.strMealThumb,
    category: m.strCategory ?? ''
  }
}

export function explodeIngredients(meal){
  const items=[]
  for(let i=1;i<=20;i++){
    const ing = meal[`strIngredient${i}`]
    const mea = meal[`strMeasure${i}`]
    if(ing && ing.trim()) items.push(`${ing}${mea?` — ${mea}`:''}`)
  }
  return items
}
