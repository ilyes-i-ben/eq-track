import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentInput } from './dto/create-equipment.input';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentInput: CreateEquipmentInput) {
    return this.prisma.equipment.create({
      data: createEquipmentInput,
    });
  }
}
