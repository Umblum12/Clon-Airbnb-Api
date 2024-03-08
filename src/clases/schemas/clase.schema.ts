import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClaseDocument = HydratedDocument<Clase>;

@Schema()
export class Clase {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    imageSrc: string[];
    @Prop()
    category: string[];
    @Prop()
    guestCount: string[];
    @Prop()
    location: string;
    @Prop()
    price: string;
    @Prop()
    userId: string;
}

export const ClaseSchema = SchemaFactory.createForClass(Clase)
