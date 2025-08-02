import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, DollarSign, Calendar, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface RideHistoryProps {
  user: User;
}

interface Ride {
  id: string;
  pickup_address: string;
  destination_address: string;
  status: string;
  fare_amount: number;
  distance_km: number;
  duration_minutes: number;
  riide_earned: number;
  evee_earned: number;
  created_at: string;
  completed_at: string;
  vehicles?: {
    make: string;
    model: string;
    license_plate: string;
  };
}

export const RideHistory = ({ user }: RideHistoryProps) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRides: 0,
    totalSpent: 0,
    totalEarned: 0,
    totalDistance: 0,
  });

  useEffect(() => {
    fetchRides();
  }, [user.id]);

  const fetchRides = async () => {
    const { data, error } = await supabase
      .from("rides")
      .select(`
        *,
        vehicles(make, model, license_plate)
      `)
      .eq("rider_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching rides:", error);
    } else {
      setRides(data || []);
      calculateStats(data || []);
    }
    setIsLoading(false);
  };

  const calculateStats = (ridesData: Ride[]) => {
    const totalRides = ridesData.length;
    const totalSpent = ridesData.reduce((sum, ride) => sum + (ride.fare_amount || 0), 0);
    const totalEarned = ridesData.reduce((sum, ride) => sum + (ride.riide_earned || 0) + (ride.evee_earned || 0), 0);
    const totalDistance = ridesData.reduce((sum, ride) => sum + (ride.distance_km || 0), 0);

    setStats({
      totalRides,
      totalSpent,
      totalEarned,
      totalDistance,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary">Completed</Badge>;
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{stats.totalRides}</p>
              </div>
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tokens Earned</p>
                <p className="text-2xl font-bold">{stats.totalEarned.toFixed(1)}</p>
              </div>
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Distance (km)</p>
                <p className="text-2xl font-bold">{stats.totalDistance.toFixed(1)}</p>
              </div>
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Recent Rides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No rides yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Book your first ride to get started!
                </p>
                <Button variant="outline" className="mt-3" onClick={fetchRides}>
                  Refresh
                </Button>
              </div>
            ) : (
              rides.map((ride) => (
                <div
                  key={ride.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(ride.status)}
                      {ride.vehicles && (
                        <span className="text-sm text-muted-foreground">
                          {ride.vehicles.make} {ride.vehicles.model}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(ride.created_at)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">From: {ride.pickup_address}</p>
                        <p className="text-muted-foreground">To: {ride.destination_address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span>${ride.fare_amount?.toFixed(2)}</span>
                      <span>{ride.distance_km}km</span>
                      {ride.duration_minutes && <span>{ride.duration_minutes}min</span>}
                    </div>
                    
                    {(ride.riide_earned > 0 || ride.evee_earned > 0) && (
                      <div className="flex items-center space-x-2">
                        {ride.riide_earned > 0 && (
                          <span className="text-primary font-medium">
                            +{ride.riide_earned} $RIIDE
                          </span>
                        )}
                        {ride.evee_earned > 0 && (
                          <span className="text-accent font-medium">
                            +{ride.evee_earned} $EVEE
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};