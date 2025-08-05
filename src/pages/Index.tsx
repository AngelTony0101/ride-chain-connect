import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockApi } from "@/lib/mockData";
import { User, Session } from "@supabase/supabase-js";
import { AuthPage } from "@/components/auth/AuthPage";
import { RideBooking } from "@/components/dashboard/RideBooking";
import { TokenWallet } from "@/components/dashboard/TokenWallet";
import { RideHistory } from "@/components/dashboard/RideHistory";
import { Car, Wallet, History, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await mockApi.auth.signOut();
    setSession(null);
    setUser(null);
    toast({
      title: "Signed out successfully",
      description: "See you next time!",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !session) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RIIDE
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button variant="outline" onClick={handleSignOut} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book" className="flex items-center">
              <Car className="mr-2 h-4 w-4" />
              Book Ride
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="mt-6">
            <RideBooking user={user} session={session} />
          </TabsContent>
          
          <TabsContent value="wallet" className="mt-6">
            <TokenWallet user={user} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <RideHistory user={user} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;