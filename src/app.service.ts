import { Injectable } from '@nestjs/common';
import * as personalData from "./mocks/personal.json"
import {IPersonal} from "./mocks/intefaces/IPersonal";

@Injectable()
export class AppService {
  private readonly personalData: IPersonal;

  constructor() {
    this.personalData = personalData;
  }

  getPersonalData(id: number): IPersonal {
    return personalData;
  }

  updateData(data: object): IPersonal {
    this.personalData[Object.keys(data)[0]] = data;
    return this.personalData;
  }
}
