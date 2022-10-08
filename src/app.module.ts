import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletService } from './wallet/wallet.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, WalletService],
})
export class AppModule {}
