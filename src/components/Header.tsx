
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-luxury-light/20 bg-gradient-to-br from-white via-luxury-cream/50 to-luxury-light/10 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-luxury-gold to-luxury-DEFAULT bg-clip-text text-transparent">
            Sky<span className="text-luxury-gold font-serif italic">High</span>
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          {["Home", "First Class", "Business Class", "Destinations", "About Us"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-luxury-DEFAULT hover:text-luxury-gold transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            className="border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold hover:text-luxury-DEFAULT transition-all duration-300 group"
          >
            <PhoneIcon className="h-4 w-4 mr-2 text-luxury-gold group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">+1 800-SKY-HIGH</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
