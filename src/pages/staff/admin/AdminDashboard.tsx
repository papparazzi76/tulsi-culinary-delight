// src/pages/staff/admin/AdminDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, UtensilsCrossed, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const adminSections = [
    {
      title: 'Gestionar Personal',
      description: 'Añadir, editar o eliminar cuentas de empleados.',
      link: '/staff/admin/users',
      icon: <Users className="h-8 w-8 text-accent" />,
    },
    {
      title: 'Gestionar Menú',
      description: 'Modificar platos, precios y categorías.',
      link: '/staff/admin/menu',
      icon: <UtensilsCrossed className="h-8 w-8 text-accent" />,
    },
    {
      title: 'Reportes de Ventas',
      description: 'Ver analíticas de ventas y rendimiento.',
      link: '/staff/admin/reports',
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-playfair text-accent mb-6">Panel de Administración</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link to={section.link} key={section.title}>
            <Card className="hover:border-accent hover:shadow-lg transition-all h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                {section.icon}
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
