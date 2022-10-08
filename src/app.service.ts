import { Injectable } from '@nestjs/common';
import * as personalData from "./mocks/personal.json"
import * as managerData from "./mocks/manager.json"
import * as hrData from "./mocks/hr.json"
import * as teamleadData from "./mocks/teamlead.json"
import {IPersonal} from "./mocks/intefaces/IPersonal";

@Injectable()
export class AppService {
  private readonly personalData: IPersonal;
  private readonly managerData: any;
  private readonly hrData: any;
  private readonly teamleadData: any;


  constructor() {
    this.personalData = personalData;
    this.managerData = managerData;
    this.hrData = hrData;
    this.teamleadData = teamleadData;
  }

  getPersonalData(id: number): any {
    return {
      personal: personalData,
      manager: managerData,
      hr: hrData,
      teamlead: teamleadData
    };
  }

  updateData(data: object): IPersonal {
    this.personalData[Object.keys(data)[0]] = data;
    return this.personalData;
  }
}
