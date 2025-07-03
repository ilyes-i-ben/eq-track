import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EquipmentTypeForDropdown } from './types/equipment-type-for-dropdown';

@Injectable()
export class EquipmentTypeService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findEndTypesDropdown() {
    const leaves = (await this.findEndTypes()) as EquipmentTypeForDropdown[];

    return leaves.map((leaf) => {
      const path = [];
      let current: EquipmentTypeForDropdown | null = leaf;
      while (current) {
        path.unshift({ id: current.id, label: current.name } as never);
        current = current.parent;
      }
      return {
        id: leaf.id,
        label: leaf.name,
        path,
      };
    });
  }
}
