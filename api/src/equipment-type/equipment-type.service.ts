import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
