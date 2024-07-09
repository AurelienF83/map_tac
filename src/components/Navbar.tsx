import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-background">
      <div className="container mx-auto px-0 sm:px-0 lg:px-0 flex justify-between items-center h-16">
        <div className="flex items-center">
          <img src="/MADE44.png" alt="Company Logo" className="h-10 w-auto" />
          <span className="ml-2 text-lg font-bold">MADE SA</span>
        </div>
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Map
          </Link>
          <Link to="/files" className="text-foreground/80 hover:text-foreground transition-colors">
            Files
          </Link>
          <Link to="/inter" className="text-foreground/80 hover:text-foreground transition-colors">
            Interventions
          </Link>
        </div>
        <div className="hidden md:flex">
          <Button>Login</Button>
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-base">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Map
            </Link>
            <Link
              to="/files"
              className="block px-3 py-2 rounded-md font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Files
            </Link>
            <Link
              to="/inter"
              className="block px-3 py-2 rounded-md font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Interventions
            </Link>
            <Button className="w-full">Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {}

function MenuIcon(props: MenuIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
