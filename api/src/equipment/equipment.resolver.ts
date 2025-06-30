import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { EquipmentService } from './equipment.service';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { DeleteEquipmentResponse } from './dto/delete-equipment.response';
import { NotFoundException } from '@nestjs/common';
import { UpdateEquipmentInput } from './dto/update-equipment.input';

@Resolver(() => Equipment)
export class EquipmentResolver {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Query(() => [Equipment], { name: 'equipments' })
  async findAllEquipments() {
    return await this.equipmentService.findAll();
  }

  @Query(() => Equipment, { name: 'findEquipment' })
  async findEquipment(@Args('id', { type: () => Int }) id: number) {
    return await this.equipmentService.findOneEquipment(id);
  }

  @Mutation(() => Equipment)
  async createEquipment(
    @Args('createEquipmentInput') createEquipmentInput: CreateEquipmentInput,
  ) {
    return await this.equipmentService.create(createEquipmentInput);
  }

  @Mutation(() => Equipment)
  async updateEquipment(
    @Args('updateEquipmentInput') updateEquipmentInput: UpdateEquipmentInput,
  ) {
    return await this.equipmentService.update(updateEquipmentInput);
  }

  @Mutation(() => DeleteEquipmentResponse)
  async removeEquipment(
    @Args('id', { type: () => Int }) id: number,
    @Args('soft', { type: () => Boolean }) soft: boolean,
  ) {
    try {
      await this.equipmentService.delete(id, soft);
    } catch (error: any) {
      return {
        success: false,
        message:
          error instanceof NotFoundException ? error.message : 'error occured',
      };
    }
    return {
      success: true,
      message: 'Equipment deleted successfully',
    };
  }
}
