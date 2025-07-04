// src/pages/staff/admin/UserManagement.tsx
import { useEffect, useState } from 'react';
import { useAdmin, Profile } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function UserManagement() {
  const { profiles, loading, fetchProfiles, updateProfileRole, createNewUser } = useAdmin();
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
      full_name: '',
      email: '',
      password: '',
      role: 'waiter' as Profile['role'],
  });

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleCreateUser = async (e: React.FormEvent) => {
      e.preventDefault();
      const success = await createNewUser(newUser);
      if (success) {
          setIsCreateUserOpen(false);
          setNewUser({ full_name: '', email: '', password: '', role: 'waiter' });
      }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-playfair text-accent">Gestión de Personal</h1>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
            <DialogTrigger asChild>
                <Button>Crear Usuario</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuevo Empleado</DialogTitle>
                    <DialogDescription>Crea una nueva cuenta para un miembro del personal.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateUser}>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input id="name" value={newUser.full_name} onChange={(e) => setNewUser({...newUser, full_name: e.target.value})} required/>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} required/>
                        </div>
                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} required/>
                        </div>
                        <div>
                            <Label htmlFor="role">Rol</Label>
                            <Select value={newUser.role} onValueChange={(value: Profile['role']) => setNewUser({...newUser, role: value})}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="waiter">Camarero</SelectItem>
                                    <SelectItem value="kitchen">Cocina</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsCreateUserOpen(false)}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3} className="text-center">Cargando...</TableCell></TableRow>
            ) : (
              profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.full_name}</TableCell>
                  <TableCell>{profile.users?.email}</TableCell>
                  <TableCell>
                    <Select value={profile.role} onValueChange={(value) => updateProfileRole(profile.id, value as Profile['role'])}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waiter">Camarero</SelectItem>
                        <SelectItem value="kitchen">Cocina</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
