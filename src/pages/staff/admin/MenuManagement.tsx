// src/pages/staff/admin/MenuManagement.tsx
import { useEffect, useState } from 'react';
import { useAdmin, MenuItem } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function MenuManagement() {
  const { menuItems, loading, fetchMenuItems, updateMenuItem } = useAdmin();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentItemData, setCurrentItemData] = useState<Partial<MenuItem>>({});

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setCurrentItemData(item);
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setCurrentItemData({});
  };

  const handleSave = async (itemId: string) => {
    await updateMenuItem(itemId, currentItemData);
    handleCancel();
  };

  const handleInputChange = (field: keyof MenuItem, value: any) => {
    setCurrentItemData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-playfair text-accent">Gestión de Menú</h1>
        {/* Potentially add a "Create New Item" button here */}
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center">Cargando menú...</TableCell></TableRow>
            ) : (
              menuItems.map((item) => {
                const isEditing = editingItemId === item.id;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {isEditing ? (
                        <Input value={currentItemData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
                      ) : (
                        item.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input value={currentItemData.category || ''} onChange={(e) => handleInputChange('category', e.target.value)} />
                      ) : (
                        item.category
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input type="number" value={currentItemData.price || 0} onChange={(e) => handleInputChange('price', parseFloat(e.target.value))} />
                      ) : (
                        `€${item.price.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={isEditing ? currentItemData.available : item.available}
                        onCheckedChange={(checked) => {
                            if (isEditing) {
                                handleInputChange('available', checked)
                            } else {
                                updateMenuItem(item.id, { available: checked })
                            }
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      {isEditing ? (
                        <div className="flex gap-2 justify-end">
                          <Button onClick={() => handleSave(item.id)}>Guardar</Button>
                          <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
                        </div>
                      ) : (
                        <Button variant="ghost" onClick={() => handleEdit(item)}>Editar</Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
