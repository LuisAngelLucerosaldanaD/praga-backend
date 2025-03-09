import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Praga Backend')
    .setDescription('The Praga API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Events')
    .addTag('Places')
    .addTag('Tickets')
    .addTag('Files')
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
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
