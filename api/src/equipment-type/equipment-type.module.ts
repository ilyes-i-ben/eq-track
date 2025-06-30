import { Module } from '@nestjs/common';
import { EquipmentTypeService } from './equipment-type.service';

@Module({
  providers: [EquipmentTypeService],
})
export class EquipmentTypeModule {}
