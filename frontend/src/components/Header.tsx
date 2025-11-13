"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Productos" },
    { href: "/cart", label: "Carrito" },
    { href: "/login", label: "Iniciar Sesión" },
    { href: "/register", label: "Registrate" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Fashion’t Park
        </Link>

        <button
          className="block md:hidden p-2"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-sky-600 ${
                pathname === link.href
                  ? "text-sky-600 font-medium"
                  : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur">
          <ul className="flex flex-col px-4 py-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-2 py-2 transition-colors hover:bg-slate-100 ${
                    pathname === link.href
                      ? "text-sky-600 font-medium"
                      : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
