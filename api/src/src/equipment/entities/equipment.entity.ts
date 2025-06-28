import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

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

  // Note: We will add the full EquipmentType object relation in a later step!

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
