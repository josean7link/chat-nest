import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as socketIo from 'socket.io';
import * as express from 'express';
import * as http from 'http';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');
  app.enableCors();

  const httpServer = http.createServer(server);
  const io = new socketIo.Server(httpServer);

  io.on('connection', (client) => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  await app.listen(3001);
  }

bootstrap();
