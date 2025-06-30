import { Module } from '@nestjs/common';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentTypeResolver } from './equipment-type.resolver';

@Module({
  providers: [EquipmentTypeService, EquipmentTypeResolver],
})
export class EquipmentTypeModule {}
