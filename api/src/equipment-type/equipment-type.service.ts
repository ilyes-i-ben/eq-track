import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EquipmentTypeTreeNode } from './types/equipment-type-tree-node';
import { EquipmentTypeTreeTransformer } from './equipment-type-tree.transformer';

@Injectable()
export class EquipmentTypeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly treeTransformer: EquipmentTypeTreeTransformer,
  ) {}

  async findAll() {
    return await this.prisma.equipmentType.findMany({
      include: {
        children: true,
        parent: {
          include: {
            parent: {
              include: {
                parent: true,
              },
            },
          },
        },
      },
    });
  }

  async findOneEquipmentType(id: number) {
    return await this.prisma.equipmentType.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async findEndTypes() {
    return await this.prisma.equipmentType.findMany({
      where: {
        children: { none: {} },
        parent: {
          parent: {
            parent: {},
            parentId: { not: null },
          },
          parentId: { not: null },
        },
        parentId: { not: null },
      },
      include: {
        parent: {
          include: {
            parent: {
              include: {
                parent: true,
              },
            },
          },
        },
      },
      orderBy: {
        parentId: { sort: 'asc' },
      },
    });
  }

  async findEquipmentTypeTree(): Promise<EquipmentTypeTreeNode[]> {
    const endTypes = await this.findEndTypes();
    const allEquipmentTypes = await this.prisma.equipmentType.findMany({
      orderBy: [{ parentId: 'asc' }, { name: 'asc' }],
    });

    return this.treeTransformer.transformToTree(allEquipmentTypes, endTypes);
  }
}
