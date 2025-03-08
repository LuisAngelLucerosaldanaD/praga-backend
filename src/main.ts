import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Praga Backend')
    .setDescription('The Praga API description')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Events')
    .addTag('Places')
    .addTag('Tickets')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableShutdownHooks();
  app.enableCors({
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    maxAge: 3600,
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
