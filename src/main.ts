import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const whitelist = ["http://localhost:8080"];
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders:"*",
    origin: "*",
  });
  await app.listen(3000);
}
bootstrap();
