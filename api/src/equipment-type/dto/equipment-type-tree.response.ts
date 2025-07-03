import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EquipmentTypeTree {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  selectable: boolean;

  @Field(() => [EquipmentTypeTree], { nullable: true })
  children?: EquipmentTypeTree[];
}
