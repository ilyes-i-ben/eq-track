import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class EquipmentType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field(() => EquipmentType, { nullable: true })
  parent?: EquipmentType;

  @Field(() => [EquipmentType])
  children: EquipmentType[];
}
