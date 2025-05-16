
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">TutorConnect</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-brand-blue transition-colors">
            Home
          </Link>
          <Link to="/find-tutors" className="text-gray-700 hover:text-brand-blue transition-colors">
            Find Tutors
          </Link>
          <Link to="/become-tutor" className="text-gray-700 hover:text-brand-blue transition-colors">
            Become a Tutor
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-brand-blue transition-colors">
            About
          </Link>
          <div className="flex ml-4 gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden z-40 animate-fade-in">
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/find-tutors" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Tutors
              </Link>
              <Link 
                to="/become-tutor" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Tutor
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-brand-blue hover:bg-brand-blue/90" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
