import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
    @Prop()
    User: string;
    @Prop()
    Password: string;
    @Prop()
    Mail: string;
    @Prop()
    Rol: string;
    @Prop()
    isFavorite: string[];
    @Prop({
        type: {
            public_id: String,
            imageUrl: String,
        }
    })
    imagePerfil: {
        public_id: string;
        imageUrl: string;
    };
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
