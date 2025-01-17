// src/components/Navigation.tsx
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Logo
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}