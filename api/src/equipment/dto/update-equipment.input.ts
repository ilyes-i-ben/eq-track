import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateEquipmentInput } from './create-equipment.input';

@InputType()
export class UpdateEquipmentInput extends PartialType(CreateEquipmentInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean, { nullable: true })
  isDeleted?: boolean;
}
