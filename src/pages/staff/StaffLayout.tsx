// src/pages/staff/StaffLayout.tsx
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Soup, ShieldCheck, CalendarCheck, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StaffLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setUserRole(profile?.role || null);
      }
    };
    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/staff/login');
  };

  const navLinks = [
    { to: '/staff/tables', icon: <LayoutDashboard />, text: 'Mesas', roles: ['waiter', 'admin'] },
    { to: '/staff/orders', icon: <ClipboardList />, text: 'Pedidos', roles: ['waiter', 'kitchen', 'admin'] },
    { to: '/staff/kitchen', icon: <Soup />, text: 'Cocina', roles: ['kitchen', 'admin'] },
    { to: '/staff/reservations', icon: <CalendarCheck />, text: 'Reservas', roles: ['waiter', 'admin'] },
    { to: '/staff/admin', icon: <ShieldCheck />, text: 'Admin', roles: ['admin'] },
  ];

  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="w-64 bg-background p-4 flex flex-col justify-between">
        <div>
          <div className="text-center mb-10">
            <img 
              src="/lovable-uploads/5aa953a7-6eb1-4763-9cbb-6075a6ebac8e.png" 
              alt="Tulsi Logo" 
              className="h-20 w-auto mx-auto"
            />
            <h2 className="text-xl font-playfair text-accent mt-2">Personal</h2>
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              userRole && link.roles.includes(userRole) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname.startsWith(link.to)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent/20'
                  }`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              )
            ))}
          </nav>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3">
          <LogOut />
          Cerrar Sesión
        </Button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
