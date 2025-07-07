export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: string
          menu_item_id: string
          quantity: number
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          menu_item_id: string
          quantity?: number
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          menu_item_id?: string
          quantity?: number
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      contest_entries: {
        Row: {
          created_at: string
          entry_date: string
          id: string
          is_winner: boolean
          subscriber_id: string
        }
        Insert: {
          created_at?: string
          entry_date?: string
          id?: string
          is_winner?: boolean
          subscriber_id: string
        }
        Update: {
          created_at?: string
          entry_date?: string
          id?: string
          is_winner?: boolean
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contest_entries_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "newsletter_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          available: boolean
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          available?: boolean
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          available?: boolean
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          contest_entry_date: string | null
          created_at: string
          eligible_for_contest: boolean
          email: string
          follows_instagram: boolean
          id: string
          name: string
          subscribed_to_newsletter: boolean
          updated_at: string
        }
        Insert: {
          contest_entry_date?: string | null
          created_at?: string
          eligible_for_contest?: boolean
          email: string
          follows_instagram?: boolean
          id?: string
          name: string
          subscribed_to_newsletter?: boolean
          updated_at?: string
        }
        Update: {
          contest_entry_date?: string | null
          created_at?: string
          eligible_for_contest?: boolean
          email?: string
          follows_instagram?: boolean
          id?: string
          name?: string
          subscribed_to_newsletter?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          menu_item_id: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          menu_item_id: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          menu_item_id?: string
          order_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_address: string | null
          delivery_type: string
          discount_amount: number
          id: string
          order_number: string
          payment_status: string
          session_id: string | null
          status: string
          stripe_session_id: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_address?: string | null
          delivery_type: string
          discount_amount?: number
          id?: string
          order_number: string
          payment_status?: string
          session_id?: string | null
          status?: string
          stripe_session_id?: string | null
          subtotal: number
          tax_amount?: number
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_address?: string | null
          delivery_type?: string
          discount_amount?: number
          id?: string
          order_number?: string
          payment_status?: string
          session_id?: string | null
          status?: string
          stripe_session_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          number_of_guests: number
          reservation_time: string
          status: string
          table_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          number_of_guests: number
          reservation_time: string
          status?: string
          table_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          number_of_guests?: number
          reservation_time?: string
          status?: string
          table_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_sales_summary: {
        Args: { start_date: string; end_date: string }
        Returns: {
          total_orders: number
          total_revenue: number
          average_order_value: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
