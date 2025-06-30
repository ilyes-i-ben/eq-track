import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { EquipmentType } from 'src/equipment-type/entities/equipment-type.entity';

@ObjectType()
export class Equipment {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field(() => Int)
  equipmentTypeId: number;

  @Field(() => EquipmentType)
  equipmentType: EquipmentType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
