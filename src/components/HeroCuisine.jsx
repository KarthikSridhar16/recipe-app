import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { filterByArea, getMealById } from "../services/api";
import { truncate } from "../utils/text";
import useFavorites from "../hooks/useFavorites";

const TOP_AREAS = ["Indian", "Italian", "French", "Japanese", "Mexican", "American"];

async function pickPopularFrom(area) {
  const list = await filterByArea(area);
  if (!list.length) return null;
  const basic = list[Math.min(4, list.length - 1)];
  const full = await getMealById(basic.idMeal);
  if (!full) return null;
  return {
    area,
    id: full.idMeal,
    name: full.strMeal,
    thumb: full.strMealThumb,
    category: full.strCategory,
    desc: truncate(full.strInstructions, 220),
  };
}

function polarToStyle(deg, cx, cy, r) {
  const rad = (deg * Math.PI) / 180;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);
  return { left: `${x}px`, top: `${y}px` };
}

export default function HeroCuisine() {
  const [slides, setSlides] = useState([]);
  const [i, setI] = useState(0);
  const { favs, toggle } = useFavorites();

  const orbitRef = useRef(null);
  const [geom, setGeom] = useState({ cx: 0, cy: 0, radius: 0 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results = await Promise.all(TOP_AREAS.map(pickPopularFrom));
      if (!cancelled) setSlides(results.filter(Boolean));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    function measure() {
      const el = orbitRef.current;
      if (!el) return;

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      const arcEl = el.querySelector(".dotted-arc");
      let radius = arcEl ? arcEl.offsetWidth / 2 : 0;

      if (!radius) {
        const shell = el.closest(".hero-shell") || document.documentElement;
        const cs = getComputedStyle(shell);
        const dish = parseFloat(cs.getPropertyValue("--dish")) || 640;
        const thumb = parseFloat(cs.getPropertyValue("--thumb")) || 96;
        const gap = parseFloat(cs.getPropertyValue("--thumb-gap")) || 56;
        radius = dish / 2 + thumb / 2 + gap;
      }

      setGeom({ cx, cy, radius });
    }

    measure();
    window.addEventListener("resize", measure);
    const id = setInterval(measure, 100);
    setTimeout(() => clearInterval(id), 800);
    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(id);
    };
  }, []);

  const cur = useMemo(() => slides[i], [slides, i]);

  const thumbs = useMemo(() => {
    if (slides.length <= 1) return [];
    const ordered = slides.slice(i + 1).concat(slides.slice(0, i));
    const uniq = ordered.filter((s) => s && s.id !== cur?.id);
    return uniq.slice(0, 3);
  }, [slides, i, cur?.id]);

  const ANGLES = [118, 156, 198];

  if (!cur) {
    return (
      <div className="hero-shell hero-full">
        <div className="mx-auto max-w-[1680px] grid lg:grid-cols-12 gap-12 items-center px-6 md:px-12 py-14">
          <div className="space-y-4 lg:col-span-7 order-1">
            <div className="h-8 w-64 rounded bg-slate-200" />
            <div className="h-28 w-full max-w-xl rounded bg-slate-200" />
          </div>
          <div className="relative flex justify-center lg:justify-end lg:col-span-5 order-2 mt-6 lg:mt-0">
            <div className="orbit">
              <div className="hero-halo" />
              <div className="dotted-arc" />
              <div className="dish-stage animate-pulse bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFav = favs.includes(cur.id);

  return (
    <div className="hero-shell hero-full">
      <div className="mx-auto max-w-[1680px] grid lg:grid-cols-12 gap-12 items-center px-6 md:px-12 py-16">
        <div className="space-y-6 order-1 lg:order-1 mt-2 lg:mt-0 ml-0 lg:ml-[-.25rem] xl:ml-[-1.25rem] 2xl:ml-[-2rem] lg:col-span-7">
          <span className="inline-block text-xs font-medium text-slate-500">
            Featured from {cur.area} · {cur.category}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight break-words">
            {cur.name}
          </h1>
          <p className="max-w-2xl text-slate-600 leading-7">{cur.desc}</p>
          <div className="flex gap-3">
            <Link
              to={`/recipe/${cur.id}`}
              className="rounded-xl px-5 py-2.5 bg-emerald-500 text-white hover:bg-emerald-600"
            >
              View recipe
            </Link>
            <button
              onClick={() => toggle(cur.id)}
              className={`fav-btn ${isFav ? "fav-on" : ""}`}
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
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end lg:col-span-5 order-2 lg:order-2 mt-8 lg:mt-0">
          <div ref={orbitRef} className="orbit will-change-transform">
            <div className="hero-halo" />
            <div className="dotted-arc" />
            <Link to={`/recipe/${cur.id}`} className="dish-stage">
              <img
                src={cur.thumb}
                alt={cur.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </Link>
            {thumbs.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setI(slides.findIndex((s) => s.id === t.id))}
                className="arc-thumb"
                style={polarToStyle(ANGLES[idx], geom.cx, geom.cy, geom.radius)}
                title={`${t.name} — ${t.area}`}
                aria-label={`Show ${t.name}`}
              >
                <img src={t.thumb} alt={t.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
