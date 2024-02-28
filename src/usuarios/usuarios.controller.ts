import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import* as nodemailer from 'nodemailer';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}



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
