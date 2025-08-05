import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, DollarSign, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { mockApi, mockVehicles } from "@/lib/mockData";

interface RideBookingProps {
  user: User;
  session: Session;
}

export const RideBooking = ({ user }: RideBookingProps) => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [nearbyVehicles, setNearbyVehicles] = useState<any[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [estimatedFare, setEstimatedFare] = useState(12.50);

  useEffect(() => {
    fetchNearbyVehicles();
  }, []);

  const fetchNearbyVehicles = async () => {
    const result = await mockApi.vehicles.select().eq("is_active", true).limit(5);
    
    if (result.error) {
      console.error("Error fetching vehicles:", result.error);
    } else {
      setNearbyVehicles(result.data || []);
    }
  };

  const handleBookRide = async (vehicleId: string) => {
    setIsBooking(true);
    
    try {
      // Simulate getting current location
      const mockPickupLat = 40.7128;
      const mockPickupLng = -74.0060;
      const mockDestLat = 40.7589;
      const mockDestLng = -73.9851;

      const { data, error } = await mockApi.rides
        .insert([
          {
            rider_id: user.id,
            vehicle_id: vehicleId,
            pickup_latitude: mockPickupLat,
            pickup_longitude: mockPickupLng,
            pickup_address: pickupAddress || "Current Location",
            destination_latitude: mockDestLat,
            destination_longitude: mockDestLng,
            destination_address: destinationAddress || "Destination",
            fare_amount: estimatedFare,
            distance_km: 5.2,
            payment_method: "riide_token",
            riide_earned: 2.5,
            status: "pending"
          }
        ])
        .select()
        .single();

      if (error) {
        toast({
          title: "Booking failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ride booked successfully!",
          description: "Your driver will arrive shortly. You'll earn 2.5 $RIIDE tokens!",
        });
        
        // Reset form
        setPickupAddress("");
        setDestinationAddress("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book ride",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Book a Ride
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Input
              id="pickup"
              placeholder="Enter pickup address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Where to?"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Estimated Fare</span>
              </div>
              <span className="font-semibold">${estimatedFare}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-primary" />
                <span>$RIIDE Earned</span>
              </div>
              <span className="font-semibold text-primary">+2.5 tokens</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="mr-2 h-5 w-5" />
            Available Vehicles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nearbyVehicles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No vehicles available nearby</p>
                <Button onClick={fetchNearbyVehicles} variant="outline" className="mt-2">
                  Refresh
                </Button>
              </div>
            ) : (
              nearbyVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-medium">
                        {vehicle.make} {vehicle.model}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.profiles?.full_name || "Driver"} • {vehicle.color}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {vehicle.vehicle_type}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          2-5 min
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleBookRide(vehicle.id)}
                    disabled={isBooking || !pickupAddress}
                    size="sm"
                  >
                    {isBooking ? "Booking..." : "Book"}
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};