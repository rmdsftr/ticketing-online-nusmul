import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './admin/driver/driver.module';
import { TypeModule } from './admin/type/type.module';
import { TravelModule } from './admin/cars/travel.module';

@Module({
  imports: [DriverModule, TypeModule, TravelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
