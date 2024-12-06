import { type IMissileType } from './Missiles'
import UnitTrait from './UnitTrait'

export type UnitOptionModifiers = Record<
  string,
  number | IMissileType | null | Array<UnitTrait> | string[]
>

export interface IUnitOption {
  id: number
  name: string
  points: number
  modifiers: UnitOptionModifiers
}

export const UnitTypes = {
  Warriors: 'Warriors',
  Skirmishers: 'Skirmishers',
  HeavyRiders: 'Heavy Riders',
  LightRiders: 'Light Riders',
  Monstrosities: 'Monstrosities',
}

export interface IUnitProfileTrait {
  trait: UnitTrait
  points?: number
}

export interface IUnitProfile {
  type: string
  name: string
  points: number
  combatDice: number
  shootingDice: number
  armour: number
  stamina: number
  traitsLimit: number
  availableTraits: IUnitProfileTrait[]
  options?: IUnitOption[]
  missileType?: IMissileType
  builtInTraits?: UnitTrait[]
  armourWhenShot?: number
}

export default class UnitProfile {
  constructor(
    public type: string,
    public name: string,
    public points: number,
    public combatDice: number,
    public shootingDice: number,
    public armour: number,
    public stamina: number,
    public traitsLimit: number,
    public availableTraits: IUnitProfileTrait[],
    public options?: IUnitOption[],
    public missileType?: IMissileType,
    public builtInTraits?: UnitTrait[],
    public armourWhenShot?: number,
  ) {}

  get formattedName(): string {
    return `${this.type} (${this.name})`
  }

  static fromObject(data: IUnitProfile): UnitProfile {
    return new UnitProfile(
      data.type,
      data.name,
      data.points,
      data.combatDice,
      data.shootingDice,
      data.armour,
      data.stamina,
      data.traitsLimit,
      data.availableTraits,
      data.options,
      data.missileType,
      data.builtInTraits,
      data.armourWhenShot,
    )
  }
}
