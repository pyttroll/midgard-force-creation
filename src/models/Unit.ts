import type { IForceItem } from './Force'
import { IMissileType } from './Missiles'
import type { IUnitOption } from './UnitProfile'
import type UnitProfile from './UnitProfile'
import UnitProfiles from './UnitProfiles'
import type UnitTrait from './UnitTrait'
import { getUnitTraits } from './UnitTrait'

export interface IUnitApi {
  name: string
  qty: number
  profile: string
  traits: Array<string>
  options: Array<number>
}

export default class Unit implements IForceItem {
  constructor(
    public name: string,
    public qty: number,
    public profile: UnitProfile,
    public traits: Array<UnitTrait>,
    public options: Array<IUnitOption>,
  ) {
    traits = traits.filter((trait) => profile.builtInTraits?.find((x) => x.name === trait.name))
  }
  validate(): void {
    throw new Error('Method not implemented.')
  }

  get missiles(): IMissileType {
    throw new Error('Method not implemented.')
  }

  toApi(): IUnitApi {
    return {
      name: this.name,
      qty: this.qty,
      profile: this.profile.name,
      traits: this.traits.map((trait) => trait.name),
      options: this.options.map((option) => option.id),
    }
  }

  static fromApi(data: IUnitApi): Unit {
    const traits = getUnitTraits()
    const profile = Object.values(UnitProfiles).find(
      (profile) => profile.name === data.profile,
    ) as UnitProfile
    return new Unit(
      data.name,
      data.qty,
      profile,
      data.traits
        .map((trait) => traits.find((t) => t.name === trait) as UnitTrait)
        .filter((x) => x != null),
      data.options.map((option) => profile.options?.find((o) => o.id === option) as IUnitOption),
    )
  }

  get builtInTraits(): Array<UnitTrait> {
    return (this.profile.builtInTraits || [])
      .filter((trait) => !this.traits.some((x) => x.discards?.includes(trait.name)))
      .filter(
        (trait) =>
          !this.options.some((x) =>
            ((x.modifiers?.discards || []) as string[]).includes(trait.name),
          ),
      )
  }

  get combinedTraits(): Array<UnitTrait> {
    return [...(this.builtInTraits || []), ...this.traits]
  }

  get armour(): number {
    const modifiers = this.options.filter((option) => option.modifiers.armour)
    let armour = this.profile.armour
    modifiers.forEach((modifier) => {
      armour += modifier.modifiers.armour as number
    })
    return armour
  }

  get armourWhenShot(): number | null {
    if (this.profile.armourWhenShot == null) {
      return null
    }
    const modifiers = this.options.filter((option) => option.modifiers.armour)
    let armourWhenShot = this.profile.armourWhenShot
    modifiers.forEach((modifier) => {
      armourWhenShot += modifier.modifiers.armour as number
    })
    return armourWhenShot
  }

  get shootingDice(): number {
    const modifiers = this.options.filter((option) => option.modifiers.shootingDice)
    let shootingDice = this.profile.shootingDice
    modifiers.forEach((modifier) => {
      shootingDice += modifier.modifiers.shootingDice as number
    })
    return shootingDice
  }

  get combatDice(): number {
    const modifiers = this.options.filter((option) => option.modifiers.combatDice)
    let combatDice = this.profile.combatDice
    modifiers.forEach((modifier) => {
      combatDice += modifier.modifiers.combatDice as number
    })
    return combatDice
  }

  get stamina(): number {
    const modifiers = this.options.filter((option) => option.modifiers.stamina)
    let stamina = this.profile.stamina
    modifiers.forEach((modifier) => {
      stamina += modifier.modifiers.stamina as number
    })
    return stamina
  }

  get missileType() {
    const modifiers = this.options.filter((option) => option.modifiers.missileType)
    if (modifiers.length > 0) {
      return modifiers[0].modifiers.missileType as IMissileType
    }
    return this.profile.missileType
  }

  get traitsPoints(): number {
    const availableTraits = [
      ...this.profile.availableTraits,
      ...getUnitTraits()
        .filter((x) => x.isCustom)
        .map((x) => ({ trait: x, points: x.pointCost[0] })),
    ]

    return this.traits.reduce(
      (acc, trait) =>
        acc +
        (trait.isPointCostBasedOnMissileRange
          ? (trait.pointCost as number[])[this.missileType ? this.missileType.range - 1 : 0]
          : availableTraits.find((x) => x.trait.name === trait.name)?.points || 0),
      0,
    )
  }

  get optionsPoints(): number {
    return this.options.reduce((acc, option) => acc + option.points, 0)
  }

  get validationErrors() {
    const errors = []
    // Check for traits removed by other traits or unit options.
    return errors
  }

  get points() {
    return this.profile.points + this.traitsPoints + this.optionsPoints
  }

  // Reputation points are calculated as 10% of the Unit or Hero’s points value, rounded to the nearest whole number
  get reputation() {
    return Math.max(1, Math.round(this.points * 0.1))
  }
}
