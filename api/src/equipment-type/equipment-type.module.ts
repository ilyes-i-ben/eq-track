import { Module } from '@nestjs/common';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentTypeResolver } from './equipment-type.resolver';
import { EquipmentTypeTreeTransformer } from './equipment-type-tree.transformer';

@Module({
  providers: [
    EquipmentTypeService,
    EquipmentTypeResolver,
    EquipmentTypeTreeTransformer,
  ],
})
export class EquipmentTypeModule {}
