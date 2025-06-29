import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteEquipmentResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
