import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClasesModule } from './clases/clases.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ArticuloModule } from './articulo/articulo.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsuariosModule,
    ClasesModule,
    ReservationsModule,
    ArticuloModule,
    CloudinaryModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
