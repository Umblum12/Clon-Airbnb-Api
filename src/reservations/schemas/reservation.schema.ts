import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
    @Prop()
    listingsid: string;
    @Prop()
    userid: string;
    @Prop()
    date: Date;
    @Prop()
    detail: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)
 