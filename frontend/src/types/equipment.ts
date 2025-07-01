export interface EquipmentType {
  id: string;
  name: string;
  parentId?: number | null;
  parent?: EquipmentType | null;
  children: EquipmentType[];
}

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  model: string;
  equipmentTypeId: number;
  equipmentType: EquipmentType;
  createdAt: string;
  updatedAt: string;
}
