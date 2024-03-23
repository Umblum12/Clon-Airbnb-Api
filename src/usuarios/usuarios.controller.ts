import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import* as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken'; // Importar jwt
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly cloudinaryService: CloudinaryService
    ) {}

  @Post('login') // Endpoint para el inicio de sesión
  async login(@Body() loginUserDto: any) {
    try {
      const user = await this.usuariosService.findByCredentials(loginUserDto.username, loginUserDto.password);
      if (!user) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      
      // Generar token JWT
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

      return { token }; // Devolver token JWT
    } catch (error) {
      throw new Error('Usuario o contraseña incorrectos');
    }
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { public_id, source_url } = await this.cloudinaryService.uploadFile(file);

    // Actualizar los valores del usuario en la base de datos
    await this.usuariosService.update(userId, { 
      imagePerfil: { public_id, imageUrl: source_url } 
    });

    return { public_id, source_url };
  }



    @Post(':mail')
    async sendEmail(@Param('mail') mail: string) {
      try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'noreplyclassstop@gmail.com',
            pass: 'buqv rssv vyim uvjd'
          }
        });
  
        // Setup email data
        const mailOptions = {
          from: 'noreplyclassstop@gmail.com',
          to: mail,
          subject: 'Verificación de Correo - ClassTop',
          html: `
            <p>Hola,</p>
            <p>Gracias por registrarte en ClassTop. Por favor, haz clic en el siguiente botón para verificar tu correo electrónico:</p>
            <a href="URL_DE_VERIFICACION" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verificar Correo</a>
            <p>Si no has creado una cuenta en ClassTop, puedes ignorar este mensaje.</p>
          `
        };
  
        // Send the email
        const info = await transporter.sendMail(mailOptions);
  
        console.log('Email sent: ' + info.response);
  
        // Respond with success
        return { message: 'Email sent successfully' };
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('An error occurred while sending the email');
      }
    }
  

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

}
