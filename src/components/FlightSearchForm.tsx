
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface Airport {
  code: string;
  name: string;
  city: string;
}

const popularAirports: Airport[] = [
  { code: "JFK", name: "John F. Kennedy International", city: "New York" },
  { code: "LHR", name: "Heathrow Airport", city: "London" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles" },
  { code: "DXB", name: "Dubai International", city: "Dubai" },
  { code: "SIN", name: "Changi Airport", city: "Singapore" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo" },
  { code: "SYD", name: "Sydney Airport", city: "Sydney" },
];

const FlightSearchForm = ({ onSearch }: { onSearch: (data: any) => void }) => {
  const [fromAirport, setFromAirport] = React.useState<string>("");
  const [toAirport, setToAirport] = React.useState<string>("");
  const [departDate, setDepartDate] = React.useState<Date>();
  const [returnDate, setReturnDate] = React.useState<Date>();
  const [passengers, setPassengers] = React.useState<string>("1");
  const [cabinClass, setCabinClass] = React.useState<string>("business");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchData = {
      from: fromAirport,
      to: toAirport,
      departDate,
      returnDate,
      passengers: parseInt(passengers),
      cabinClass
    };
    
    onSearch(searchData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto -mt-16 z-10 relative">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-luxury-DEFAULT">Find Your Perfect Flight</h2>
        
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* From Airport */}
            <div className="col-span-1 md:col-span-1">
              <Label htmlFor="fromAirport">From</Label>
              <Select value={fromAirport} onValueChange={setFromAirport}>
                <SelectTrigger id="fromAirport">
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent>
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* To Airport */}
            <div className="col-span-1 md:col-span-1">
              <Label htmlFor="toAirport">To</Label>
              <Select value={toAirport} onValueChange={setToAirport}>
                <SelectTrigger id="toAirport">
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent>
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Depart Date */}
            <div className="col-span-1 md:col-span-1">
              <Label htmlFor="departDate">Depart</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="departDate"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !departDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departDate ? format(departDate, "MMM dd, yyyy") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={setDepartDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Return Date */}
            <div className="col-span-1 md:col-span-1">
              <Label htmlFor="returnDate">Return</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="returnDate"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MMM dd, yyyy") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Passengers */}
            <div className="col-span-1 md:col-span-1">
              <Label htmlFor="passengers">Passengers</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger id="passengers">
                  <SelectValue placeholder="Passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Cabin Class */}
          <div className="mt-6">
            <Label>Cabin Class</Label>
            <RadioGroup 
              className="flex gap-6 mt-2" 
              defaultValue="business"
              value={cabinClass}
              onValueChange={setCabinClass}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business" className="cursor-pointer">Business Class</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="first" id="first" />
                <Label htmlFor="first" className="cursor-pointer">First Class</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-luxury-gold hover:bg-opacity-90 text-black"
            size="lg"
          >
            <Plane className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
