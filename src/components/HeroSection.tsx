
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-[530px] overflow-hidden bg-gradient-to-br from-luxury-light via-luxury-DEFAULT to-luxury-cream">
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-DEFAULT/90 via-luxury-gold/80 to-luxury-light/80 opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-40"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1540339832862-722f0ecb5c90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center 30%"
        }}
      ></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white drop-shadow-xl mb-4 max-w-2xl">
          Experience Luxury <span className="text-luxury-gold bg-gradient-to-r from-luxury-gold via-luxury-light to-white bg-clip-text text-transparent">Above the Clouds</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-serif mb-10 max-w-xl">
          Premium first class and business travel experiences with personalized, world-class service
        </p>
        <div className="flex gap-4 z-10">
          <Button className="bg-gradient-to-br from-luxury-gold via-luxury-light to-luxury-DEFAULT text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200 border-none">
            Explore First Class
          </Button>
          <Button variant="outline" className="text-white border-white/90 hover:bg-white hover:text-luxury-DEFAULT font-semibold px-8 py-3 rounded-lg shadow">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
