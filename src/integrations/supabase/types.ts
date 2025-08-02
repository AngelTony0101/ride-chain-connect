export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          evee_balance: number | null
          full_name: string | null
          id: string
          kyc_verified: boolean | null
          phone: string | null
          riide_balance: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          evee_balance?: number | null
          full_name?: string | null
          id?: string
          kyc_verified?: boolean | null
          phone?: string | null
          riide_balance?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          evee_balance?: number | null
          full_name?: string | null
          id?: string
          kyc_verified?: boolean | null
          phone?: string | null
          riide_balance?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      rides: {
        Row: {
          completed_at: string | null
          created_at: string
          destination_address: string | null
          destination_latitude: number | null
          destination_longitude: number | null
          distance_km: number | null
          driver_id: string | null
          duration_minutes: number | null
          evee_earned: number | null
          fare_amount: number | null
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          pickup_address: string | null
          pickup_latitude: number
          pickup_longitude: number
          rider_id: string
          riide_earned: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["ride_status"] | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          destination_address?: string | null
          destination_latitude?: number | null
          destination_longitude?: number | null
          distance_km?: number | null
          driver_id?: string | null
          duration_minutes?: number | null
          evee_earned?: number | null
          fare_amount?: number | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          pickup_address?: string | null
          pickup_latitude: number
          pickup_longitude: number
          rider_id: string
          riide_earned?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          destination_address?: string | null
          destination_latitude?: number | null
          destination_longitude?: number | null
          distance_km?: number | null
          driver_id?: string | null
          duration_minutes?: number | null
          evee_earned?: number | null
          fare_amount?: number | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          pickup_address?: string | null
          pickup_latitude?: number
          pickup_longitude?: number
          rider_id?: string
          riide_earned?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "rides_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "rides_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      token_transactions: {
        Row: {
          amount: number
          balance_after: number
          blockchain_tx_hash: string | null
          created_at: string
          description: string | null
          id: string
          ride_id: string | null
          token_type: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          blockchain_tx_hash?: string | null
          created_at?: string
          description?: string | null
          id?: string
          ride_id?: string | null
          token_type: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          blockchain_tx_hash?: string | null
          created_at?: string
          description?: string | null
          id?: string
          ride_id?: string | null
          token_type?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vehicles: {
        Row: {
          battery_level: number | null
          color: string | null
          created_at: string
          driver_id: string
          id: string
          is_active: boolean | null
          latitude: number | null
          license_plate: string
          longitude: number | null
          make: string
          model: string
          updated_at: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          year: number | null
        }
        Insert: {
          battery_level?: number | null
          color?: string | null
          created_at?: string
          driver_id: string
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          license_plate: string
          longitude?: number | null
          make: string
          model: string
          updated_at?: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          year?: number | null
        }
        Update: {
          battery_level?: number | null
          color?: string | null
          created_at?: string
          driver_id?: string
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          license_plate?: string
          longitude?: number | null
          make?: string
          model?: string
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_method: "riide_token" | "evee_token" | "crypto" | "fiat"
      ride_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
      user_role: "rider" | "driver" | "admin"
      vehicle_type: "car" | "bike" | "scooter" | "ev"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_method: ["riide_token", "evee_token", "crypto", "fiat"],
      ride_status: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      user_role: ["rider", "driver", "admin"],
      vehicle_type: ["car", "bike", "scooter", "ev"],
    },
  },
} as const
