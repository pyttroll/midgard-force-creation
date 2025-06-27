import type { IForceItem } from './Force'
import type HeroTrait from './HeroTrait'
import type { IHeroStatus } from './HeroStatuses'
import type { IMissileType } from './Missiles'
import type Spell from './Spell'
import { getHeroTraits } from './HeroTrait'
import { Spells } from './Spell'

export interface IHeroApi {
  name: string
  status: IHeroStatus
  traits: Array<string>
  missileType?: IMissileType
  armourModifier?: number
  spells?: Array<string>
  contingent: string | null
}

export default class Hero implements IForceItem {
  constructor(
    public name: string,
    public status: IHeroStatus,
    public traits: Array<HeroTrait>,
    public missileType?: IMissileType,
    public armourModifier?: number,
    public spells?: Array<Spell>,
    public contingent: string | null = null,
  ) {}
  validate(): void {
    throw new Error('Method not implemented.')
  }

  toApi(): IHeroApi {
    return {
      name: this.name,
      status: this.status,
      traits: this.traits.map((trait) => trait.name),
      missileType: this.missileType,
      armourModifier: this.armourModifier,
      spells: this.spells?.map((spell) => spell.name),
      contingent: this.contingent,
    }
  }

  static fromApi(data: IHeroApi): Hero {
    const traits = getHeroTraits()
    return new Hero(
      data.name,
      data.status,
      data.traits
        .map((trait) => traits.find((t) => t.name === trait) as HeroTrait)
        .filter((x) => x != null),
      data.missileType,
      data.armourModifier,
      data.spells?.map(
        (spell) => Object.entries(Spells).find((s) => s[1].name === spell)?.[1] as Spell,
      ),
      data.contingent,
    )
  }

  get stamina() {
    return this.status.level > 1 ? 2 : 1
  }

  get combatDice() {
    return this.status.level
  }

  get shootingDice() {
    return this.missileType ? 1 : 0
  }

  get missiles() {
    return this.missileType
  }

  get armour() {
    return 3 + (this.armourModifier || 0)
  }

  get armourModifierIncrease() {
    return (this.armourModifier || 0) > 0
  }

  set armourModifierIncrease(value: boolean) {
    if (value) {
      this.armourModifier = 1
    } else {
      this.armourModifier = 0
    }
  }

  get armourModifierDecrease() {
    return (this.armourModifier || 0) < 0
  }

  set armourModifierDecrease(value: boolean) {
    if (value) {
      this.armourModifier = -1
    } else {
      this.armourModifier = 0
    }
  }

  // Reputation points are calculated as 10% of the Unit or Hero’s points value, rounded to the nearest whole number
  get reputation() {
    const modifiers = this.traits.filter((trait) => trait.modifiers?.reputation)
    let reputation = Math.max(1, Math.round(this.points * 0.1))
    modifiers.forEach((modifier) => {
      reputation += modifier.modifiers.reputation as number
    })

    return reputation
  }

  get armourPoints() {
    return 2 * (this.armourModifier || 0)
  }

  get missilePoints() {
    return this.missileType ? this.missileType.heroPointCost[this.status.level - 1] : 0
  }

  get traitsPoints() {
    return this.traits.reduce(
      (acc, trait) =>
        acc +
        (trait.isPointCostBasedOnMissileRange || false
          ? (trait.pointCost as number[])[this.missileType?.range ? this.missileType?.range - 1 : 0]
          : typeof trait.pointCost === 'number'
            ? trait.pointCost
            : trait.pointCost[this.status.level - 1]),
      0,
    )
  }

  get spellsPoints() {
    return this.spells ? this.spells.reduce((acc, spell) => acc + (spell?.pointCost || 0), 0) : 0
  }

  get points() {
    return (
      this.status.points +
      this.armourPoints +
      this.missilePoints +
      this.traitsPoints +
      this.spellsPoints
    )
  }

  get validationErrors() {
    const errors = []
    // Heroes with the Sorcery Trait may have a number of spells equal to their level.
    const sorceryTrait = this.traits.find((trait) => trait.name === 'Sorcery')
    if (sorceryTrait && this.spells && this.spells.length > this.status.level) {
      errors.push('Heroes with the Sorcery Trait may have a number of spells equal to their level')
    }

    // Heroes can only have spells if they have the Sorcery Trait.
    if (!sorceryTrait && this.spells && this.spells.length > 0) {
      errors.push('Heroes can only have spells if they have the Sorcery Trait')
    }
    return errors
  }

  get contingentFormatted() {
    switch (this.contingent) {
      case '1':
        return 'I'
      case '2':
        return 'II'
      case '3':
        return 'III'
      case '4':
        return 'IV'
      default:
        return this.contingent
    }
  }
}
