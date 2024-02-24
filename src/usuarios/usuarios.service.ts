import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/usuario.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {
  /**
   *
   */
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioModel.create(createUsuarioDto);
  }

  async findAll() {
    const usuarios = await this.usuarioModel.find();
    return usuarios;
  }

  findOne(id: string) {
    return this.usuarioModel.findById(id);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const existingUsuario = await this.usuarioModel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true }, // Return the modified document
    );

    if (!existingUsuario) {
      throw new NotFoundException(`Usuario with id ${id} not found`);
    }

    return existingUsuario;
  }

  async remove(id: string) {
    const existingUsuario = await this.usuarioModel.findById(id);

    if (!existingUsuario) {
      throw new NotFoundException(`Usuario with id ${id} not found`);
    }

    return this.usuarioModel.deleteOne({ _id: id });
  }
}
