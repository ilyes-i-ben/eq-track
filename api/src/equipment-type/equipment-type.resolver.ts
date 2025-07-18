import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { EquipmentType } from './entities/equipment-type.entity';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentTypeTree } from './dto/equipment-type-tree.response';

@Resolver(() => EquipmentType)
export class EquipmentTypeResolver {
  constructor(private equipmentTypeService: EquipmentTypeService) {}

  @Query(() => [EquipmentType], { name: 'equipmentTypes' })
  async findAll() {
    return await this.equipmentTypeService.findAll();
  }

  @Query(() => EquipmentType, { name: 'findEquipmentType' })
  async findOneEquipmentType(@Args('id', { type: () => Int }) id: number) {
    return await this.equipmentTypeService.findOneEquipmentType(id);
  }

  @Query(() => [EquipmentType], { name: 'findEndTypes' })
  async findEndTypes() {
    return this.equipmentTypeService.findEndTypes();
  }

  @Query(() => [EquipmentTypeTree], { name: 'equipmentTypeTree' })
  async equipmentTypeTree() {
    return this.equipmentTypeService.findEquipmentTypeTree();
  }
}
