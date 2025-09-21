import { useEffect, useState } from 'react'
const KEY='fav-meals'
export default function useFavorites(){
  const [favs,setFavs]=useState(()=>JSON.parse(localStorage.getItem(KEY)||'[]'))
  useEffect(()=>localStorage.setItem(KEY, JSON.stringify(favs)),[favs])
  const toggle = (id)=> setFavs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id])
  return { favs, toggle }
}
