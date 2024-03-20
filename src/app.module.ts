import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClasesModule } from './clases/clases.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ArticuloModule } from './articulo/articulo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsuariosModule,
    ClasesModule,
    ReservationsModule,
    ArticuloModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
