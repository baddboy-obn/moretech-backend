export interface IPersonalItem {
  "id": number;
  "birthdate": string;
  "about": string;
  "avatar": string
}

interface IAlert {
  "isAlert": boolean;
  "count": number;
}

export interface IGuildsItem {
  "name": string;
  "description": string
  "alert": IAlert
}

enum ActivityItemStatus {
  ENGAGE = "Участвую",
  NOT_ENGAGE = "Не участвую",
  CREATOR = "Создатель",
  STARTED = "Завершено",
  ENDED = "Завершено"
}

export interface IActivityItem {
  "name": string
  "type": string
  "status": ActivityItemStatus | string
}

export interface IAchievement {
  "name": string,
  "description": string,
  "image": string,
  "takeDate": string,
  "coins": number
}

export interface IProfessional {
  "name": string,
  "lastname": string,
  "department": string,
  "mentor": string,
  "manager": string,
  "position": string
}

export interface IPersonal {
  professional: IProfessional,
  personal: IPersonalItem,
  finance: {
    "coins": number,
    "targetPercent": number
  },
  friends: {
    items: IPersonalItem[],
    count: number
  },
  votes: {
    items: IPersonalItem[],
    count: number,
  },
  guilds: {
    items: IGuildsItem[],
    count: number,
  },
  activity: {
    items: IActivityItem[],
    count: number
  },
  achievement: {
    items: IAchievement[],
    count:number
  }
}
