
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Plane } from "lucide-react";

// Mock flight data - in a real application, this would come from an API
const airlines = [
  "Emirates", "Qatar Airways", "Singapore Airlines", 
  "Etihad Airways", "British Airways", "Lufthansa", 
  "Air France"
];

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

interface FlightResultsProps {
  searchData: {
    from: string;
    to: string;
    departDate?: Date;
    returnDate?: Date;
    passengers: number;
    cabinClass: string;
  };
  onSelectFlight: (flight: Flight) => void;
}

const generateMockFlights = (searchData: FlightResultsProps["searchData"]): Flight[] => {
  if (!searchData.from || !searchData.to || !searchData.departDate) {
    return [];
  }

  // Generate 4-6 flights with different times and prices
  const flights: Flight[] = [];
  const numFlights = Math.floor(Math.random() * 3) + 4; // 4-6 flights
  
  const baseTime = new Date(searchData.departDate);
  baseTime.setHours(6, 0, 0); // Start at 6 AM
  
  for (let i = 0; i < numFlights; i++) {
    const departureTime = new Date(baseTime);
    departureTime.setHours(departureTime.getHours() + i * 2); // Flights every 2 hours
    
    const durationHours = 3 + Math.floor(Math.random() * 10); // 3-12 hours
    const durationMinutes = Math.floor(Math.random() * 60); // 0-59 minutes
    
    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(arrivalTime.getHours() + durationHours);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + durationMinutes);
    
    const basePrice = searchData.cabinClass === "first" ? 2500 : 1200;
    const priceVariation = Math.floor(Math.random() * 600);
    
    flights.push({
      id: `flight-${i}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      departureTime: format(departureTime, "HH:mm"),
      arrivalTime: format(arrivalTime, "HH:mm"),
      duration: `${durationHours}h ${durationMinutes}m`,
      fromCode: searchData.from,
      toCode: searchData.to,
      price: basePrice + priceVariation,
      cabinClass: searchData.cabinClass,
      stops: Math.floor(Math.random() * 2), // 0-1 stops
    });
  }
  
  // Sort by price
  return flights.sort((a, b) => a.price - b.price);
};

const FlightResults: React.FC<FlightResultsProps> = ({ searchData, onSelectFlight }) => {
  const [flights, setFlights] = React.useState<Flight[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (searchData.from && searchData.to && searchData.departDate) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockFlights = generateMockFlights(searchData);
        setFlights(mockFlights);
        setLoading(false);
      }, 1500);
    }
  }, [searchData]);
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-8 p-6 text-center">
        <div className="h-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-luxury-gold"></div>
        </div>
        <p className="text-lg">Searching for the best premium flights...</p>
      </div>
    );
  }
  
  if (flights.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-8">
        <p className="text-center text-gray-500">
          Complete your search to see available flights
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Available {searchData.cabinClass === "first" ? "First" : "Business"} Class Flights</h2>
      <p className="mb-6 text-gray-600">
        {flights.length} flights found from {searchData.from} to {searchData.to} on{" "}
        {searchData.departDate && format(searchData.departDate, "MMMM d, yyyy")} for {searchData.passengers} passenger{searchData.passengers > 1 ? "s" : ""}
      </p>
      
      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="grid grid-cols-12 p-6">
                <div className="col-span-3">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{flight.airline}</span>
                    <Badge variant="outline" className="w-fit mt-1">
                      {flight.cabinClass === "first" ? "First Class" : "Business Class"}
                    </Badge>
                  </div>
                </div>
                
                <div className="col-span-6 flex items-center justify-center">
                  <div className="flex flex-col md:flex-row items-center justify-between w-full md:gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold">{flight.departureTime}</div>
                      <div className="text-sm text-gray-500">{flight.fromCode}</div>
                    </div>
                    
                    <div className="flex flex-col items-center my-2 md:my-0">
                      <div className="text-xs text-gray-500">{flight.duration}</div>
                      <div className="relative w-32 md:w-40">
                        <div className="border-t border-gray-300 absolute w-full top-1/2"></div>
                        <div className="absolute -top-1 right-0">
                          <Plane className="h-4 w-4 text-luxury-gold transform rotate-90" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {flight.stops === 0 ? "Direct" : `${flight.stops} stop`}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold">{flight.arrivalTime}</div>
                      <div className="text-sm text-gray-500">{flight.toCode}</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-3 flex flex-col items-end justify-center">
                  <div className="text-2xl font-bold text-luxury-DEFAULT">
                    ${flight.price}
                  </div>
                  <div className="text-sm text-gray-500">per passenger</div>
                  <Button 
                    onClick={() => onSelectFlight(flight)} 
                    className="mt-2 bg-luxury-gold hover:bg-opacity-90 text-black"
                  >
                    Select
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
