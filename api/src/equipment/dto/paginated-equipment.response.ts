import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Equipment } from '../entities/equipment.entity';

@ObjectType()
export class PaginatedEquipment {
  @Field(() => [Equipment])
  items: [Equipment];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  pageSize: number;
}
