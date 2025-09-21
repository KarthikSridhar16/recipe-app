import axios from "axios";
const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchMealsByName(q) {
  const { data } = await axios.get(`${BASE}/search.php?s=${encodeURIComponent(q)}`);
  return data.meals || [];
}

export async function getMealById(id) {
  const { data } = await axios.get(`${BASE}/lookup.php?i=${id}`);
  return data.meals?.[0] || null;
}

export async function listCategories() {
  const { data } = await axios.get(`${BASE}/list.php?c=list`);
  return (data.meals || []).map((m) => m.strCategory);
}

export async function listIngredients() {
  const { data } = await axios.get(`${BASE}/list.php?i=list`);
  return (data.meals || []).slice(0, 80).map((m) => m.strIngredient);
}

export async function filterBy({ category, ingredient }) {
  if (category) {
    const { data } = await axios.get(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
    return data.meals || [];
  }
  if (ingredient) {
    const { data } = await axios.get(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
    return data.meals || [];
  }
  return [];
}

export async function listAreas() {
  const { data } = await axios.get(`${BASE}/list.php?a=list`);
  return (data.meals || []).map((m) => m.strArea);
}

export async function filterByArea(area) {
  const { data } = await axios.get(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}
