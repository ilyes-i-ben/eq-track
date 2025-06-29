import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEquipmentInput {
  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field(() => Int)
  equipmentTypeId: number;
}
