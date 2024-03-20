import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Articulo } from './schemas/articulo.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticuloService {
  constructor(
    @InjectModel(Articulo.name)
    private articuloModel: Model<Articulo>,
  ) {}

  async create(createArticuloDto: CreateArticuloDto) {
    try {
      const createdArticulo = await this.articuloModel.create(createArticuloDto);
      return createdArticulo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    const articulos = await this.articuloModel.find();
    return articulos;
  }

  async findOne(id: string) {
    const articulo = await this.articuloModel.findById(id);
    if (!articulo) {
      throw new NotFoundException(`Articulo with id ${id} not found`);
    }
    return articulo;
  }

  async update(id: string, updateArticuloDto: UpdateArticuloDto) {
    const existingArticulo = await this.articuloModel.findByIdAndUpdate(
      id,
      updateArticuloDto,
      { new: true },
    );

    if (!existingArticulo) {
      throw new NotFoundException(`Articulo with id ${id} not found`);
    }

    return existingArticulo;
  }

  async remove(id: string) {
    const existingArticulo = await this.articuloModel.findById(id);

    if (!existingArticulo) {
      throw new NotFoundException(`Articulo with id ${id} not found`);
    }

    return this.articuloModel.deleteOne({ _id: id });
  }
}
