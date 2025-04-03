import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validación global
  app.useGlobalPipes(new ValidationPipe());

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('TipoTinder API')
    .setDescription('Documentación de la API para la app tipo Tinder')
    .setVersion('1.0')
    .addTag('users') // Puedes agregar más tags por módulo
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
