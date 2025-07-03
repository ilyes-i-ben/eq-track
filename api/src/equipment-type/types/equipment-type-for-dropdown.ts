export type EquipmentTypeForDropdown = {
  id: number;
  name: string;
  parent: EquipmentTypeForDropdown | null;
};
