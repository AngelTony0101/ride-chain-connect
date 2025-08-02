-- Create enum types for the ride-sharing platform
CREATE TYPE public.ride_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.vehicle_type AS ENUM ('car', 'bike', 'scooter', 'ev');
CREATE TYPE public.user_role AS ENUM ('rider', 'driver', 'admin');
CREATE TYPE public.payment_method AS ENUM ('riide_token', 'evee_token', 'crypto', 'fiat');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role user_role DEFAULT 'rider',
  wallet_address TEXT,
  riide_balance DECIMAL(10,2) DEFAULT 0,
  evee_balance DECIMAL(10,2) DEFAULT 0,
  kyc_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  license_plate TEXT NOT NULL UNIQUE,
  vehicle_type vehicle_type NOT NULL,
  color TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  battery_level INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rides table
CREATE TABLE public.rides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rider_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  pickup_latitude DECIMAL(10,8) NOT NULL,
  pickup_longitude DECIMAL(11,8) NOT NULL,
  pickup_address TEXT,
  destination_latitude DECIMAL(10,8),
  destination_longitude DECIMAL(11,8),
  destination_address TEXT,
  status ride_status DEFAULT 'pending',
  fare_amount DECIMAL(10,2),
  distance_km DECIMAL(8,2),
  duration_minutes INTEGER,
  payment_method payment_method,
  riide_earned DECIMAL(10,2) DEFAULT 0,
  evee_earned DECIMAL(10,2) DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create token_transactions table
CREATE TABLE public.token_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  ride_id UUID REFERENCES public.rides(id) ON DELETE SET NULL,
  transaction_type TEXT NOT NULL, -- 'earn', 'spend', 'stake', 'unstake'
  token_type TEXT NOT NULL, -- 'riide', 'evee'
  amount DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  blockchain_tx_hash TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for vehicles
CREATE POLICY "Drivers can manage their own vehicles" 
ON public.vehicles 
FOR ALL 
USING (auth.uid() = driver_id);

CREATE POLICY "Everyone can view active vehicles" 
ON public.vehicles 
FOR SELECT 
USING (is_active = true);

-- Create RLS policies for rides
CREATE POLICY "Users can view their own rides" 
ON public.rides 
FOR SELECT 
USING (auth.uid() = rider_id OR auth.uid() = driver_id);

CREATE POLICY "Riders can create rides" 
ON public.rides 
FOR INSERT 
WITH CHECK (auth.uid() = rider_id);

CREATE POLICY "Drivers can update rides they're assigned to" 
ON public.rides 
FOR UPDATE 
USING (auth.uid() = driver_id OR auth.uid() = rider_id);

-- Create RLS policies for token transactions
CREATE POLICY "Users can view their own transactions" 
ON public.token_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
ON public.token_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rides_updated_at
  BEFORE UPDATE ON public.rides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_vehicles_driver_id ON public.vehicles(driver_id);
CREATE INDEX idx_vehicles_location ON public.vehicles(latitude, longitude);
CREATE INDEX idx_rides_rider_id ON public.rides(rider_id);
CREATE INDEX idx_rides_driver_id ON public.rides(driver_id);
CREATE INDEX idx_rides_status ON public.rides(status);
CREATE INDEX idx_rides_created_at ON public.rides(created_at);
CREATE INDEX idx_token_transactions_user_id ON public.token_transactions(user_id);
CREATE INDEX idx_token_transactions_created_at ON public.token_transactions(created_at);