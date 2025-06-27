export default class Contingent {
  constructor(
    public name: string,
    public description: string,
  ) {}
}

export interface IContingentAllocation {
  value: string
  qty: number
}
