import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToRecipes = () => {
    const el = document.getElementById("recipes");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goHome = () => {
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
      setTimeout(scrollToTop, 0);
    }
  };

  const goRecipes = () => {
    if (location.pathname === "/") {
      scrollToRecipes();
    } else {
      navigate("/");
      setTimeout(scrollToRecipes, 0);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-100">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <button onClick={goHome} className="font-semibold">
          <span className="text-slate-900">Sase</span>
          <span className="text-emerald-500">Food</span>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={goHome}
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            Home
          </button>
          <button
            onClick={goRecipes}
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            Recipe
          </button>
          <Link
            to="/favorites"
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  );
}
