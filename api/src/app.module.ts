import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentTypeService } from './equipment-type/equipment-type.service';
import { EquipmentTypeModule } from './equipment-type/equipment-type.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    EquipmentModule,
    EquipmentTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, EquipmentTypeService],
})
export class AppModule {}
