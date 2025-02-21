import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AssetsService } from './assets/assets.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const assetService = app.get(AssetsService);
  // assetService.susbcribeEvents().subscribe((data) => {
  //   console.log(data);
  // });

  await app.listen(3000);
}
bootstrap();
