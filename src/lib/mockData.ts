export const mockUser = {
  id: "mock-user-123",
  aud: "authenticated",
  email: "demo@riide.app",
  email_confirmed_at: "2024-01-15T10:00:00Z",
  phone: "",
  confirmed_at: "2024-01-15T10:00:00Z",
  last_sign_in_at: "2024-01-15T10:00:00Z",
  app_metadata: {},
  user_metadata: {
    full_name: "Demo User"
  },
  identities: [],
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z"
};

export const mockSession = {
  access_token: "mock-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  token_type: "bearer",
  user: mockUser,
};

export const mockProfile = {
  id: "profile-123",
  user_id: "mock-user-123",
  full_name: "Demo User",
  email: "demo@riide.app",
  riide_balance: 125.75,
  evee_balance: 45.20,
  wallet_address: "0x742d35Cc6634C0532925a3b8D4F25749E",
  kyc_verified: true,
  role: "rider" as const,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z"
};

export const mockVehicles = [
  {
    id: "vehicle-1",
    driver_id: "driver-1",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    color: "White",
    vehicle_type: "electric_car",
    license_plate: "RIIDE-001",
    is_active: true,
    battery_level: 85,
    latitude: 40.7128,
    longitude: -74.0060,
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
    profiles: {
      full_name: "Sarah Johnson",
      avatar_url: null
    }
  },
  {
    id: "vehicle-2",
    driver_id: "driver-2",
    make: "Nissan",
    model: "Leaf",
    year: 2022,
    color: "Blue",
    vehicle_type: "electric_car",
    license_plate: "RIIDE-002",
    is_active: true,
    battery_level: 92,
    latitude: 40.7150,
    longitude: -74.0080,
    created_at: "2024-01-12T11:00:00Z",
    updated_at: "2024-01-12T11:00:00Z",
    profiles: {
      full_name: "Mike Chen",
      avatar_url: null
    }
  },
  {
    id: "vehicle-3",
    driver_id: "driver-3",
    make: "BMW",
    model: "i3",
    year: 2021,
    color: "Black",
    vehicle_type: "electric_car",
    license_plate: "RIIDE-003",
    is_active: true,
    battery_level: 78,
    latitude: 40.7090,
    longitude: -74.0040,
    created_at: "2024-01-08T14:00:00Z",
    updated_at: "2024-01-08T14:00:00Z",
    profiles: {
      full_name: "Alex Rodriguez",
      avatar_url: null
    }
  }
];

export const mockTransactions = [
  {
    id: "tx-1",
    user_id: "mock-user-123",
    transaction_type: "earn",
    token_type: "riide",
    amount: 2.5,
    balance_after: 125.75,
    description: "Ride completion bonus",
    ride_id: "ride-1",
    blockchain_tx_hash: null,
    created_at: "2024-01-20T15:30:00Z"
  },
  {
    id: "tx-2",
    user_id: "mock-user-123",
    transaction_type: "earn",
    token_type: "evee",
    amount: 1.8,
    balance_after: 45.20,
    description: "EV usage reward",
    ride_id: "ride-1",
    blockchain_tx_hash: null,
    created_at: "2024-01-20T15:30:00Z"
  },
  {
    id: "tx-3",
    user_id: "mock-user-123",
    transaction_type: "earn",
    token_type: "riide",
    amount: 3.2,
    balance_after: 123.25,
    description: "Peak hour bonus",
    ride_id: "ride-2",
    blockchain_tx_hash: null,
    created_at: "2024-01-19T18:45:00Z"
  },
  {
    id: "tx-4",
    user_id: "mock-user-123",
    transaction_type: "spend",
    token_type: "riide",
    amount: 5.0,
    balance_after: 120.05,
    description: "Premium ride upgrade",
    ride_id: null,
    blockchain_tx_hash: null,
    created_at: "2024-01-18T12:20:00Z"
  }
];

export const mockRides = [
  {
    id: "ride-1",
    rider_id: "mock-user-123",
    driver_id: "driver-1",
    vehicle_id: "vehicle-1",
    pickup_latitude: 40.7128,
    pickup_longitude: -74.0060,
    pickup_address: "123 Main St, New York, NY",
    destination_latitude: 40.7589,
    destination_longitude: -73.9851,
    destination_address: "456 Broadway, New York, NY",
    fare_amount: 12.50,
    distance_km: 5.2,
    duration_minutes: 18,
    payment_method: "riide_token",
    riide_earned: 2.5,
    evee_earned: 1.8,
    status: "completed",
    created_at: "2024-01-20T15:00:00Z",
    started_at: "2024-01-20T15:05:00Z",
    completed_at: "2024-01-20T15:23:00Z",
    updated_at: "2024-01-20T15:23:00Z",
    vehicles: {
      make: "Tesla",
      model: "Model 3",
      color: "White",
      license_plate: "RIIDE-001",
      profiles: {
        full_name: "Sarah Johnson"
      }
    }
  },
  {
    id: "ride-2",
    rider_id: "mock-user-123",
    driver_id: "driver-2",
    vehicle_id: "vehicle-2",
    pickup_latitude: 40.7150,
    pickup_longitude: -74.0080,
    pickup_address: "789 Park Ave, New York, NY",
    destination_latitude: 40.7505,
    destination_longitude: -73.9934,
    destination_address: "Central Park West, New York, NY",
    fare_amount: 15.75,
    distance_km: 7.1,
    duration_minutes: 25,
    payment_method: "riide_token",
    riide_earned: 3.2,
    evee_earned: 2.1,
    status: "completed",
    created_at: "2024-01-19T18:20:00Z",
    started_at: "2024-01-19T18:25:00Z",
    completed_at: "2024-01-19T18:50:00Z",
    updated_at: "2024-01-19T18:50:00Z",
    vehicles: {
      make: "Nissan",
      model: "Leaf",
      color: "Blue",
      license_plate: "RIIDE-002",
      profiles: {
        full_name: "Mike Chen"
      }
    }
  },
  {
    id: "ride-3",
    rider_id: "mock-user-123",
    driver_id: "driver-3",
    vehicle_id: "vehicle-3",
    pickup_latitude: 40.7090,
    pickup_longitude: -74.0040,
    pickup_address: "Wall Street, New York, NY",
    destination_latitude: 40.7282,
    destination_longitude: -73.9942,
    destination_address: "SoHo, New York, NY",
    fare_amount: 9.25,
    distance_km: 3.8,
    duration_minutes: 12,
    payment_method: "credit_card",
    riide_earned: 1.8,
    evee_earned: 1.2,
    status: "completed",
    created_at: "2024-01-18T14:10:00Z",
    started_at: "2024-01-18T14:15:00Z",
    completed_at: "2024-01-18T14:27:00Z",
    updated_at: "2024-01-18T14:27:00Z",
    vehicles: {
      make: "BMW",
      model: "i3",
      color: "Black",
      license_plate: "RIIDE-003",
      profiles: {
        full_name: "Alex Rodriguez"
      }
    }
  }
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  auth: {
    getSession: async () => {
      await delay(100);
      return { data: { session: mockSession }, error: null };
    },
    signUp: async (credentials: any) => {
      await delay(500);
      return { data: { user: mockUser, session: mockSession }, error: null };
    },
    signInWithPassword: async (credentials: any) => {
      await delay(500);
      return { data: { user: mockUser, session: mockSession }, error: null };
    },
    signOut: async () => {
      await delay(200);
      return { error: null };
    }
  },
  
  profiles: {
    select: () => ({
      eq: (field: string, value: any) => ({
        single: async () => {
          await delay(200);
          return { data: mockProfile, error: null };
        }
      })
    })
  },
  
  vehicles: {
    select: () => ({
      eq: (field: string, value: any) => ({
        limit: async (count: number) => {
          await delay(300);
          return { data: mockVehicles, error: null };
        }
      })
    })
  },
  
  rides: {
    insert: (data: any) => ({
      select: () => ({
        single: async () => {
          await delay(500);
          const newRide = {
            id: `ride-${Date.now()}`,
            ...data[0],
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          return { data: newRide, error: null };
        }
      })
    }),
    
    select: () => ({
      eq: (field: string, value: any) => ({
        order: (field: string, options: any) => ({
          limit: async (count: number) => {
            await delay(200);
            return { data: mockRides, error: null };
          }
        })
      })
    })
  },
  
  token_transactions: {
    select: () => ({
      eq: (field: string, value: any) => ({
        order: (field: string, options: any) => ({
          limit: async (count: number) => {
            await delay(200);
            return { data: mockTransactions, error: null };
          }
        })
      })
    })
  }
};