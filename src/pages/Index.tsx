
import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Flight {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fromCode: string;
  toCode: string;
  price: number;
  cabinClass: string;
  stops: number;
}

const Index = () => {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: undefined,
    returnDate: undefined,
    passengers: 1,
    cabinClass: "business"
  });
  
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  
  const handleSearch = (data: any) => {
    setSearchData(data);
    setHasSearched(true);
    window.scrollTo({
      top: document.getElementById('results')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };
  
  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsLeadFormOpen(true);
  };
  
  const closeLeadForm = () => {
    setIsLeadFormOpen(false);
    setSelectedFlight(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4">
          <FlightSearchForm onSearch={handleSearch} />
          
          <div id="results" className="pt-4">
            {hasSearched && (
              <FlightResults 
                searchData={searchData}
                onSelectFlight={handleSelectFlight}
              />
            )}
          </div>
          
          <section className="max-w-5xl mx-auto mt-16 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Premium Travel Experience</h2>
                <p className="text-gray-600 mb-4">
                  Indulge in the ultimate luxury air travel with our premium first class and business class offerings. 
                  Experience impeccable service, spacious accommodations, and exquisite dining at 35,000 feet.
                </p>
                <p className="text-gray-600">
                  Our team of dedicated travel specialists works with top airlines to secure the best premium cabins 
                  at competitive rates, ensuring your journey is as memorable as your destination.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Personalized Service</h2>
                <p className="text-gray-600 mb-4">
                  At SkyHigh, we understand that premium travel is about more than just a seat. Our travel 
                  specialists provide end-to-end support, from booking the perfect flight to arranging special amenities.
                </p>
                <p className="text-gray-600">
                  After selecting your flight, you'll be connected with a dedicated agent who will handle every 
                  detail of your journey, ensuring a seamless and luxurious travel experience.
                </p>
              </div>
            </div>
          </section>
          
          <section className="max-w-5xl mx-auto mt-12 px-4 py-12 bg-luxury-cream rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Elevate Your Travel?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Search for premium flights above or contact our dedicated team of travel specialists who can create 
              a bespoke travel experience tailored to your preferences.
            </p>
            <div className="flex justify-center">
              <button className="bg-luxury-gold hover:bg-opacity-90 text-black px-6 py-3 rounded-md font-medium">
                Contact a Specialist
              </button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      
      <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          {selectedFlight && (
            <LeadForm 
              selectedFlight={selectedFlight}
              passengers={searchData.passengers}
              onClose={closeLeadForm}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
