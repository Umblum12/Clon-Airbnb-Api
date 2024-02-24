import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop()
    User: string;
    @Prop()
    Password: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
