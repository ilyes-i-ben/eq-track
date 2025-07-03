import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EquipmentTypeDropdownPath {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;
}

@ObjectType()
export class EquipmentTypeDropdown {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field(() => [EquipmentTypeDropdownPath])
  path: EquipmentTypeDropdownPath[];
}
