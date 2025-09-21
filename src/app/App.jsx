import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <ScrollToHash />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Recipe App
      </footer>
    </div>
  );
}
