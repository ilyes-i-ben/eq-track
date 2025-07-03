import { Injectable } from '@nestjs/common';
import { EquipmentType } from '@prisma/client';
import { EquipmentTypeTreeNode } from './types/equipment-type-tree-node';

@Injectable()
export class EquipmentTypeTreeTransformer {
  transformToTree(
    all: EquipmentType[],
    selectables: EquipmentType[],
  ): EquipmentTypeTreeNode[] {
    // id -> EquipmentType
    const byId = new Map<number, EquipmentType>();
    all.forEach((type) => byId.set(type.id, type));

    // set of selectable ids
    const selectableIds = new Set(selectables.map((t) => t.id));

    // collect all ids to include (selectables + ancestors)
    const includeIds = new Set<number>();
    for (const type of selectables) {
      let current: EquipmentType | undefined = type;
      while (current) {
        includeIds.add(current.id);
        current = current.parentId ? byId.get(current.parentId) : undefined;
      }
    }

    // filter to only included types
    const filtered = all.filter((type) => includeIds.has(type.id));

    // parentId -> children
    const childrenOf = new Map<number | null, EquipmentType[]>();
    for (const type of filtered) {
      const parent = type.parentId ?? null;
      if (!childrenOf.has(parent)) childrenOf.set(parent, []);
      childrenOf.get(parent)!.push(type);
    }

    // build the tree from root nodes (parentId === null)...
    return this.makeTree(null, childrenOf, selectableIds);
  }

  private makeTree(
    parentId: number | null,
    childrenOf: Map<number | null, EquipmentType[]>,
    selectableIds: Set<number>,
  ): EquipmentTypeTreeNode[] {
    const children = childrenOf.get(parentId) || [];
    return children.map((type) => {
      const node: EquipmentTypeTreeNode = {
        id: type.id,
        label: type.name,
        selectable: selectableIds.has(type.id),
      };
      const kids = this.makeTree(type.id, childrenOf, selectableIds);
      if (kids.length) node.children = kids;
      return node;
    });
  }
}
