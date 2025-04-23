
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

// Expanded international airports for truly global directions
const popularAirports = [
  { code: "JFK", name: "John F. Kennedy International", city: "New York" },
  { code: "LHR", name: "Heathrow Airport", city: "London" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles" },
  { code: "DXB", name: "Dubai International", city: "Dubai" },
  { code: "SIN", name: "Changi Airport", city: "Singapore" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo" },
  { code: "SYD", name: "Sydney Airport", city: "Sydney" },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt" },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam" },
  { code: "ORD", name: "O'Hare International", city: "Chicago" },
  { code: "ICN", name: "Incheon International", city: "Seoul" },
  { code: "MIA", name: "Miami International", city: "Miami" },
  { code: "GRU", name: "São Paulo–Guarulhos", city: "São Paulo" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas", city: "Madrid" },
  { code: "BCN", name: "Barcelona Airport", city: "Barcelona" },
  { code: "JNB", name: "O.R. Tambo International", city: "Johannesburg" },
  { code: "YYZ", name: "Toronto Pearson", city: "Toronto" },
  { code: "DOH", name: "Hamad International", city: "Doha" },
  { code: "MUC", name: "Munich Airport", city: "Munich" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich" },
  { code: "VIE", name: "Vienna International", city: "Vienna" },
  { code: "DEL", name: "Indira Gandhi International", city: "Delhi" },
  { code: "MEX", name: "Benito Juárez Int’l", city: "Mexico City" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul" },
  { code: "BOM", name: "Chhatrapati Shivaji Intl", city: "Mumbai" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen" },
  { code: "DME", name: "Domodedovo Intl", city: "Moscow" },
  { code: "CAI", name: "Cairo International", city: "Cairo" },
  // Add more as needed for an even bigger network...
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
    <div className="bg-white/60 glass rounded-3xl shadow-xl max-w-5xl mx-auto -mt-20 z-20 relative border border-luxury-gold/50 backdrop-blur-lg">
      <div className="p-8 md:p-10">
        <h2 className="text-3xl font-playfair font-bold mb-7 text-luxury-DEFAULT tracking-tight bg-gradient-to-br from-luxury-DEFAULT via-luxury-gold to-luxury-light bg-clip-text text-transparent">
          Find Your Perfect Flight
        </h2>

        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7">
            {/* From Airport */}
            <div className="col-span-1">
              <Label htmlFor="fromAirport" className="text-luxury-DEFAULT font-semibold">From</Label>
              <Select value={fromAirport} onValueChange={setFromAirport}>
                <SelectTrigger id="fromAirport" className="glass">
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 shadow-xl z-50 max-h-56 overflow-y-auto">
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code}) — {airport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* To Airport */}
            <div className="col-span-1">
              <Label htmlFor="toAirport" className="text-luxury-DEFAULT font-semibold">To</Label>
              <Select value={toAirport} onValueChange={setToAirport}>
                <SelectTrigger id="toAirport" className="glass">
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 shadow-xl z-50 max-h-56 overflow-y-auto">
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code}) — {airport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Depart Date */}
            <div className="col-span-1">
              <Label htmlFor="departDate" className="text-luxury-DEFAULT font-semibold">Depart</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="departDate"
                    className={cn(
                      "w-full justify-start text-left font-normal glass",
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
            <div className="col-span-1">
              <Label htmlFor="returnDate" className="text-luxury-DEFAULT font-semibold">Return</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="returnDate"
                    className={cn(
                      "w-full justify-start text-left font-normal glass",
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
            <div className="col-span-1">
              <Label htmlFor="passengers" className="text-luxury-DEFAULT font-semibold">Passengers</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger id="passengers" className="glass">
                  <SelectValue placeholder="Passengers" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 shadow-xl z-50 max-h-56 overflow-y-auto">
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
          <div className="mt-8">
            <Label className="text-luxury-DEFAULT font-semibold">Cabin Class</Label>
            <RadioGroup
              className="flex gap-7 mt-2"
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
            className="w-full mt-8 bg-gradient-to-r from-luxury-gold via-luxury-light to-luxury-DEFAULT text-black shadow-lg font-semibold tracking-wide transition-all duration-200 hover:brightness-110 hover:scale-105"
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

