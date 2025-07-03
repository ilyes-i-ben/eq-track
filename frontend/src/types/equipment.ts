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
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteEquipmentResponse {
  success: boolean;
  message?: string | null;
}

export interface CreateEquipmentInput {
  name: string;
  brand: string;
  model: string;
  equipmentTypeId: number;
}
