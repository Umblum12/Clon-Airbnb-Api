import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clase, ClaseSchema } from './schemas/clase.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Clase.name, schema: ClaseSchema }])],
  controllers: [ClasesController],
  providers: [ClasesService],
})
export class ClasesModule {}
