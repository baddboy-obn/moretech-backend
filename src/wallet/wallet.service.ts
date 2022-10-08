import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

export enum walletType {
  EMPLOYER = "employer",
  HR = "hr",
  TEAMLEAD = "teamlead",
  MANAGER = "manager",
  ROOT = "root"
}
interface IWalletItem {
  type: walletType,
  email: string,
  "publicKey": string,
  "privateKey": string
}

interface IWallets {
  employer: IWalletItem,
  hr: IWalletItem,
  teamlead: IWalletItem,
  manager: IWalletItem,
  root: IWalletItem
}

interface IWalletBalanceResponse {
  "maticAmount": number,
  "coinsAmount": number
}

enum TypeCoin {
  NFT = 'ntf',
  RUBLE = 'ruble',
  MATIC = 'matic'
}

export class TransferDto {
  from: string;
  to: string;
  type: TypeCoin;
  amount: number | string;
}

@Injectable()
export class WalletService {
  wallets: IWallets = {
    employer: {
      type: walletType.EMPLOYER,
      email: "test1@test.ru",
      "publicKey": "0x935C3428855203E51AC3a0691ec7f36EB644E82b",
      "privateKey": "d082a1568cf437cdc1183c77a0f9208db89b7b5c18ed9c0ca273395577123fd1"
    },
    hr: {
      type: walletType.HR,
      email: "test1@test.ru",
      "publicKey": "0x73E21BA7525dF8F6F16edf6ba60552537a42D7fd",
      "privateKey": "e13ed6bf10ab22c6b3954bd6e8ab67bd798fae4add07b4e6e5e6595e3b9082f2"
    },
    teamlead: {
      type: walletType.TEAMLEAD,
      email: "test1@test.ru",
      "publicKey": "0x85D77033760b56BDa9DBDBde26f1975ae1cCa3A5",
      "privateKey": "64d2ffa905220400226aedbaf995c83a334637a750e7ab27ae3175bc832e3bb0"
    },
    manager: {
      type: walletType.MANAGER,
      email: "test1@test.ru",
      "publicKey": "0x878046A8B0d27a7aB38A740129f5745c19f1f78C",
      "privateKey": "d705d331c9e033c0c881a6529b388f7534e9945e2e51a0c57d7ea80cff6c8447"
    },
    root: {
      type: walletType.ROOT,
      email: "root@test.ru",
      "publicKey": "0x6693f7C5897FF48e96f0f7D3CDb924C14576357F",
      "privateKey": "962b289e75161199d59c4fdb3540b0b08711854ef7399817ab5257effa8debe1"
    }
  }

  constructor(private readonly httpService: HttpService) {}

  /**
   * Get wallet coin balance
   * @param type
   * @param publicKey
   */
  async getWalletBalance(type: walletType, publicKey: string): Promise<any>{
    if(this.wallets[type].publicKey !== publicKey) return;
    const response = await this.httpService.axiosRef.get(`https://hackathon.lsp.team/hk/v1/wallets/${this.wallets[type].publicKey}/balance`);
    return response["data"];
  }

  /**
   * Get NFT balance
   * @param type
   * @param publicKey
   */
  async getNFTBalance(type: walletType, publicKey: string): Promise<any> {
    if(this.wallets[type].publicKey !== publicKey) return;
    const response = await this.httpService.axiosRef.get(`https://hackathon.lsp.team/hk/v1/wallets/${this.wallets[type].publicKey}/nft/balance`);
    return response["data"]["balance"];
  }

  /**
   * Transaction between wallet
   * @param from (publicKey)
   * @param to (publickKey)
   * @param type (enum RUBLE|MATIC)
   * @param amount (float of coin)
   */
  async transactionFromTo(from: string, to: string, type: TypeCoin, amount: number | string): Promise<any> {
    const fromWallet = Object.keys(this.wallets).filter(row => this.wallets[row].publicKey === from)
    let obj = {}
    if (type === TypeCoin.NFT) {
      Object.assign({tokenId: amount})
    }else{
      Object.assign({amount})
    }
    const data = await this.httpService.axiosRef.post(`https://hackathon.lsp.team/hk/v1/transfers/${type}`,
      {
        fromPrivateKey: this.wallets[fromWallet[0]].privateKey , toPublicKey: to, ...obj
      }
    )
    return data["data"];
  }

  /**
   * Check of transaction status
   * @param transactionHash
   */
  async checkStatus(transactionHash: string): Promise<any> {
    const data = await this.httpService.axiosRef.get(`https://hackathon.lsp.team/hk/v1/transfers/status/${transactionHash}`)
    return data["data"];
  }
}
