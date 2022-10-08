import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {TransferDto, WalletService, walletType} from "./wallet/wallet.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly walletService: WalletService
  ) {}

  @Get("/person")
  getData() {
    return this.appService.getPersonalData(1)
  }

  @Patch("/person")
  setData(@Body() data) {
    return this.appService.updateData(data);
  }

  @Get("/person/wallet/:type/:publicKey")
  async balance(@Param('type') type: walletType, @Param('publicKey') publicKey: string) {
    const wallet = await this.walletService.getWalletBalance(type, publicKey);
    const nft = await this.walletService.getNFTBalance(type, publicKey);
    return { wallet, nft }
  }

  @Post("/person/transfer/")
  async transfer(@Body() data: TransferDto) {
    await this.walletService.transactionFromTo(data.from, data.to, data.type, data.amount);
  }
}
