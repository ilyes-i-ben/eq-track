import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { UpdateEquipmentInput } from './dto/update-equipment.input';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.equipment.findMany({
      include: {
        equipmentType: true,
      },
    });
  }

  async create(createEquipmentInput: CreateEquipmentInput) {
    return await this.prisma.equipment.create({
      data: createEquipmentInput,
      include: {
        equipmentType: true,
      },
    });
  }

  async update({ id, ...data }: UpdateEquipmentInput) {
    return await this.prisma.equipment.update({
      where: { id },
      data,
      include: {
        equipmentType: true,
      },
    });
  }

  async delete(equipmentId: number, soft: boolean = false) {
    // todo: move the "try catch" to resolver instead
    try {
      if (soft) {
        return await this.softDelete(equipmentId);
      }
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

  private async softDelete(equipmentId: number) {
    return await this.prisma.equipment.update({
      where: {
        id: equipmentId,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
