export interface IHrItem {
  name: string,
  lastname: string,
  position: string,
  progress: number,
  pulse: number,
  votes: number,
  comments: string[]
}

export interface Ih {
  items: IHrItem[],
  count: number,
  page: number
}
