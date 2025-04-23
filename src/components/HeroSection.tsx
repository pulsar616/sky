
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-DEFAULT to-luxury-light opacity-80"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1540339832862-722f0ecb5c90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center 30%"
        }}
      ></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
          Experience Luxury <span className="text-luxury-gold">Above the Clouds</span>
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
          Premium first class and business travel experiences with personalized service
        </p>
        <div className="flex gap-4">
          <Button className="bg-luxury-gold hover:bg-opacity-90 text-black">
            Explore First Class
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-luxury-DEFAULT">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
