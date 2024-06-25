import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <img src="/MADE44.png" alt="Company Logo" className="h-10 w-auto" />
          <span className="ml-2 text-lg font-bold">MADE SA</span>
        </div>
        <div className="hidden md:flex space-x-4 text-sm">
          <a href="#" className="text-foreground/60 hover:text-foreground/80 transition-colors">
            Map
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground/80 transition-colors">
            Docs
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground/80 transition-colors">
            Button 3
          </a>
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
            <a
              href="#"
              className="block px-3 py-2 rounded-md font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              Map
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              Button
            </a>
            <Button className="w-full">Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function MenuIcon(props) {
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
