import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

start();
