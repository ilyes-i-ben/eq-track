import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipmentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.equipmentType.findMany({
      take: 5,
      include: {
        children: true,
        parent: true,
      },
    });
  }
}
