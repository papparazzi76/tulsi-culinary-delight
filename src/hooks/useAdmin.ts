// src/hooks/useAdmin.ts
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Profile {
  id: string;
  role: 'admin' | 'waiter' | 'kitchen';
  full_name: string;
  users: {
      email: string;
  } | null;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface Reservation {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    reservation_time: string;
    number_of_guests: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes: string | null;
    table_id: string | null;
}

export interface ReportData {
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
}

export const useAdmin = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role');
      if (error) throw error;
      setProfiles(data.map(profile => ({
        ...profile,
        users: null // Since we don't have email access from auth.users
      })) as Profile[]);
    } catch (error: any) {
      toast.error('Error al cargar los perfiles: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMenuItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('menu_items').select('*').order('name');
      if (error) throw error;
      setMenuItems(data);
    } catch (error: any) {
      toast.error('Error al cargar el menú: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .in('status', ['pending', 'confirmed'])
            .order('reservation_time', { ascending: true });
        if (error) throw error;
        
        // Filter out expired reservations (1 hour after reservation time)
        const now = new Date();
        const activeReservations = (data as Reservation[]).filter(reservation => {
          const reservationTime = new Date(reservation.reservation_time);
          const expirationTime = new Date(reservationTime.getTime() + 60 * 60 * 1000); // +1 hour
          return now < expirationTime;
        });
        
        setReservations(activeReservations);
    } catch (error: any) {
        toast.error('Error al cargar las reservas: ' + error.message);
    } finally {
        setLoading(false);
    }
  }, []);
  
  const fetchSalesReport = useCallback(async (startDate: Date, endDate: Date) => {
    setLoading(true);
    try {
        const { data, error } = await supabase.rpc('get_sales_summary', {
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
        });
        if (error) throw error;
        setReportData(data?.[0] || null);
    } catch (error: any) {
        toast.error('Error al generar el reporte: ' + error.message);
    } finally {
        setLoading(false);
    }
  }, []);
  
  const updateReservation = async (reservationId: string, updates: Partial<Reservation>) => {
      try {
          const { error } = await supabase.from('reservations').update(updates).eq('id', reservationId);
          if (error) throw error;
          toast.success("Reserva actualizada.");
          fetchReservations(); // Refresh the list
          return true;
      } catch (error: any) {
          toast.error("Error al actualizar la reserva: " + error.message);
          return false;
      }
  }
  
  const updateProfileRole = async (profileId: string, newRole: Profile['role']) => {
    try {
        const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', profileId);
        if(error) throw error;
        toast.success("Rol de usuario actualizado.");
        fetchProfiles();
    } catch (error: any) {
        toast.error("Error al actualizar el rol: " + error.message);
    }
  }
  
  const updateMenuItem = async (itemId: string, updates: Partial<MenuItem>) => {
      try {
          const { error } = await supabase.from('menu_items').update(updates).eq('id', itemId);
          if (error) throw error;
          toast.success("Plato actualizado correctamente.");
          fetchMenuItems();
      } catch(error: any) {
          toast.error("Error al actualizar el plato: " + error.message);
      }
  }

  const createNewUser = async (userData: {email: string, password: string, full_name: string, role: Profile['role']}) => {
      setLoading(true);
      try {
          // Note: This requires user signups to be enabled in your Supabase project.
          // For production, it's better to do this via a server-side function.
          const { data: authData, error: authError } = await supabase.auth.signUp({
              email: userData.email,
              password: userData.password,
          });

          if (authError) throw authError;
          if (!authData.user) throw new Error("No se pudo crear el usuario.");

          // Now create the profile with the role
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: authData.user.id,
                full_name: userData.full_name,
                role: userData.role,
            });
        
          if (profileError) {
              // If profile creation fails, you might want to delete the auth user
              // This requires admin privileges and is best done server-side.
              throw profileError;
          }

          toast.success("Usuario creado correctamente.");
          fetchProfiles();
          return true;
      } catch (error: any) {
          toast.error("Error al crear el usuario: " + error.message);
          return false;
      } finally {
          setLoading(false);
      }
  }

  return {
    profiles,
    menuItems,
    reservations,
    reportData,
    loading,
    fetchProfiles,
    fetchMenuItems,
    fetchReservations,
    fetchSalesReport,
    updateProfileRole,
    updateMenuItem,
    createNewUser,
    updateReservation,
  };
};
