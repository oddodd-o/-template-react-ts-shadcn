// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div>
      <Navigation />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}