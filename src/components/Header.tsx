
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-luxury-DEFAULT">
            Sky<span className="text-luxury-gold">High</span>
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-luxury-gold transition-colors duration-200">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-luxury-gold transition-colors duration-200">
            First Class
          </a>
          <a href="#" className="text-gray-700 hover:text-luxury-gold transition-colors duration-200">
            Business Class
          </a>
          <a href="#" className="text-gray-700 hover:text-luxury-gold transition-colors duration-200">
            Destinations
          </a>
          <a href="#" className="text-gray-700 hover:text-luxury-gold transition-colors duration-200">
            About Us
          </a>
        </nav>
        <div className="flex items-center">
          <Button variant="ghost" className="flex items-center gap-1">
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">+1 800-SKY-HIGH</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
