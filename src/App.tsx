// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// *** CAMBIO 1: Importar HashRouter en lugar de BrowserRouter ***
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { supabase } from './integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

// ... (El resto de las importaciones de páginas no cambia)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import PaymentSuccessTPV from "./pages/PaymentSuccessTPV";
import PaymentCancelledTPV from "./pages/PaymentCancelledTPV";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffLayout from "./pages/staff/StaffLayout";
import TableMapView from "./pages/staff/TabMapView";
import KitchenView from "./pages/staff/KitchenView";
import OrdersPanel from "./pages/staff/OrdersPanel";
import ReservationManagement from "./pages/staff/admin/ReservationManagement";
import AdminDashboard from "./pages/staff/admin/AdminDashboard";
import UserManagement from "./pages/staff/admin/UserManagement";
import MenuManagement from "./pages/staff/admin/MenuManagement";
import ReportsDashboard from "./pages/staff/admin/ReportsDashboard";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (!session) {
    return <Navigate to="/staff/login" replace />;
  }

  return <>{children}</>;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* *** CAMBIO 2: Usar HashRouter aquí *** */}
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/pago-exitoso" element={<PaymentSuccessTPV />} />
          <Route path="/pago-cancelado" element={<PaymentCancelledTPV />} />
          <Route path="/staff/login" element={<StaffLogin />} />

          {/* Staff Protected Routes */}
          <Route 
            path="/staff" 
            element={
              <ProtectedRoute>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="tables" replace />} />
            <Route path="tables" element={<TableMapView />} />
            <Route path="orders" element={<OrdersPanel />} />
            <Route path="kitchen" element={<KitchenView />} />
            <Route path="reservations" element={<ReservationManagement />} />
            <Route path="admin" >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="menu" element={<MenuManagement />} />
                <Route path="reports" element={<ReportsDashboard />} />
            </Route>
          </Route>

          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
