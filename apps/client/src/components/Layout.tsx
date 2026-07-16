import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Panel de recordatorios", end: true },
  { to: "/citas", label: "Citas médicas" },
  { to: "/medicamentos", label: "Medicamentos" },
];

export function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          Agenda Médica
          <span>Citas y medicamentos</span>
        </div>
        <nav className="sidebar__nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
