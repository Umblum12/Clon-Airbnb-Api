import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClaseDocument = HydratedDocument<Clase>;

@Schema()
export class Clase {
    @Prop()
    location: string;
    @Prop()
    details: string;
    @Prop()
    images: string[];
}

export const ClaseSchema = SchemaFactory.createForClass(Clase)
