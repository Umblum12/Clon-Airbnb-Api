import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clase } from './schemas/clase.schema';
import { Model } from 'mongoose';


@Injectable()
export class ClasesService {
  
  constructor(
    @InjectModel(Clase.name)
    private claseModel: Model<Clase>,
  ) {}

  async create(createClaseDto: CreateClaseDto) {
    try {
      const createdClase = await this.claseModel.create(createClaseDto);
      return createdClase;
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async findAll() {
    const clases = await this.claseModel.find();
    return clases;
  }

  findOne(id: number) {
    return `This action returns a #${id} clase`;
  }

  async update(id: string, updateClaseDto: UpdateClaseDto) {
    const existingClase = await this.claseModel.findByIdAndUpdate(
      id,
      updateClaseDto,  // <-- Usar la variable directamente
      { new: true },   // Return the modified document
    );

    if (!existingClase) {
      throw new NotFoundException(`Clase with id ${id} not found`);
    }

    return existingClase;
  }

  async remove(id: string) {
    const existingClase = await this.claseModel.findById(id);

    if (!existingClase) {
      throw new NotFoundException(`Clase with id ${id} not found`);
    }

    return this.claseModel.deleteOne({ _id: id });
  }
}
