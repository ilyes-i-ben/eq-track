export type EquipmentTypeTreeNode = {
  id: number;
  label: string;
  selectable: boolean;
  children?: EquipmentTypeTreeNode[];
};
