import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticuloDocument = HydratedDocument<Articulo>;

@Schema()
export class Articulo {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    Date: Date;
    @Prop()
    imageSrc: string[];
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo)
