import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './schemas/reservation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    try {
      const createdReservation = await this.reservationModel.create(createReservationDto);
      return createdReservation;
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async findAll() {
    const reservations = await this.reservationModel.find();
    return reservations;
  }


  findOne(id: string) {
    return this.reservationModel.findById(id);
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const existingReservation = await this.reservationModel.findByIdAndUpdate(
      id,
      updateReservationDto,
      { new: true }, // Return the modified document
    );

    if (!existingReservation) {
      throw new NotFoundException(`Reservacion with id ${id} not found`);
    }

    return existingReservation;
  }

  async remove(id: string) {
    const existingReservation = await this.reservationModel.findById(id);

    if (!existingReservation) {
      throw new NotFoundException(`Reservacion with id ${id} not found`);
    }

    return this.reservationModel.deleteOne({ _id: id });
  }
}
