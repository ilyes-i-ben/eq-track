import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentInput } from './dto/create-equipment.input';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.equipment.findMany();
  }

  async create(createEquipmentInput: CreateEquipmentInput) {
    return await this.prisma.equipment.create({
      data: createEquipmentInput,
    });
  }

  async delete(equipmentId: number) {
    try {
      return await this.prisma.equipment.delete({
        where: {
          id: equipmentId,
        },
      });
    } catch {
      throw new NotFoundException(
        `Equipment with id : ${equipmentId} not found.`,
      );
    }
  }
}
