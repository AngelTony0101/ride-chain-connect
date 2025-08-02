import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, History, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface TokenWalletProps {
  user: User;
}

interface Profile {
  riide_balance: number;
  evee_balance: number;
  wallet_address?: string;
}

interface Transaction {
  id: string;
  transaction_type: string;
  token_type: string;
  amount: number;
  description: string;
  created_at: string;
}

export const TokenWallet = ({ user }: TokenWalletProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchTransactions();
  }, [user.id]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("riide_balance, evee_balance, wallet_address")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data);
    }
    setIsLoading(false);
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("token_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setTransactions(data || []);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earn":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "spend":
        return <Coins className="h-4 w-4 text-destructive" />;
      default:
        return <History className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">$RIIDE Balance</p>
                <p className="text-3xl font-bold">{profile?.riide_balance?.toFixed(2) || "0.00"}</p>
                <p className="text-xs text-muted-foreground mt-1">Ride & Earn Token</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Coins className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent-foreground">$EVEE Balance</p>
                <p className="text-3xl font-bold">{profile?.evee_balance?.toFixed(2) || "0.00"}</p>
                <p className="text-xs text-muted-foreground mt-1">EV Ecosystem Token</p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Coins className="h-8 w-8 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Wallet Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile?.wallet_address ? (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Connected Wallet</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {profile.wallet_address.slice(0, 6)}...{profile.wallet_address.slice(-4)}
                </p>
              </div>
              <Badge variant="secondary">Connected</Badge>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-3">Connect your Web3 wallet to enable crypto payments</p>
              <Button variant="outline" disabled>
                Connect Wallet (Coming Soon)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start riding to earn your first tokens!
                </p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.transaction_type)}
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.transaction_type === "earn" 
                        ? "text-primary" 
                        : "text-destructive"
                    }`}>
                      {transaction.transaction_type === "earn" ? "+" : "-"}
                      {transaction.amount} ${transaction.token_type.toUpperCase()}
                    </p>
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