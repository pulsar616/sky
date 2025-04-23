
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { User, Phone, Mail, CalendarDays, Plane } from "lucide-react";

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

interface LeadFormProps {
  selectedFlight: Flight;
  passengers: number;
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ selectedFlight, passengers, onClose }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  
  const totalPrice = selectedFlight.price * passengers;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log({
      name,
      phone,
      email,
      notes,
      flightId: selectedFlight.id,
      totalPrice
    });
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Thank You!</CardTitle>
          <CardDescription className="text-center">
            Your request has been submitted successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="my-6">
            <p className="text-lg">
              One of our luxury travel specialists will contact you at {phone} within the next 2 hours to finalize your booking.
            </p>
          </div>
          <Button onClick={onClose} className="mt-4">
            Return to search
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Booking Request</CardTitle>
        <CardDescription>
          A travel specialist will contact you to finalize your premium flight booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">Flight Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Plane className="h-4 w-4 mr-2 text-luxury-gold" />
              <span>{selectedFlight.airline}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-luxury-gold" />
              <span>Date TBD</span>
            </div>
            <div className="col-span-2 mt-1">
              <span className="font-medium">{selectedFlight.fromCode} → {selectedFlight.toCode}</span>
              <span className="text-gray-500 ml-2">{selectedFlight.duration}</span>
            </div>
            <div className="col-span-2 mt-1">
              <span className="font-medium">
                {selectedFlight.cabinClass === "first" ? "First Class" : "Business Class"}
              </span>
              <span className="text-gray-500 ml-2">
                {passengers} passenger{passengers > 1 ? "s" : ""}
              </span>
            </div>
            <div className="col-span-2 mt-3 text-right">
              <span className="text-sm text-gray-500">Estimated Total</span>
              <div className="text-xl font-bold text-luxury-DEFAULT">${totalPrice}</div>
            </div>
          </div>
        </div>
      
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                    className="pl-10"
                    placeholder="John Smith"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required
                    className="pl-10"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    className="pl-10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special requests or preferences"
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-luxury-gold hover:bg-opacity-90 text-black">
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadForm;
