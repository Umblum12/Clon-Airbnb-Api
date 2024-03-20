import { Module } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { ArticuloController } from './articulo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Articulo, ArticuloSchema } from './schemas/articulo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Articulo.name, schema: ArticuloSchema }])],
  controllers: [ArticuloController],
  providers: [ArticuloService],
})
export class ArticuloModule {}
