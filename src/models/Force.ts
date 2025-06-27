import { createGuid } from '@/Utils'
import Hero, { type IHeroApi } from './Hero'
import type { IMissileType } from './Missiles'
import type { IUnitApi } from './Unit'
import Unit from './Unit'
import { ITheme } from './Themes'
import Themes from './Themes'

interface IForceApi {
  id: string
  name: string
  heroes: Array<IHeroApi>
  units: Array<IUnitApi>
  theme?: string
  useContingents: boolean
}

export interface IForceItem {
  name: string
  get points(): number
  get reputation(): number
  get shootingDice(): number
  get missiles(): IMissileType | undefined
  get armour(): number
  get traitsPoints(): number
  validate(): void
}

export default class Force {
  constructor(
    public id: string = createGuid(),
    public name: string = 'Your Force',
    public heroes: Array<Hero> = [],
    public units: Array<Unit> = [],
    public theme: string = null,
    public useContingents: boolean = false,
  ) {
    this.id = id || createGuid()
    this.name = name
    this.heroes = heroes
    this.units = units
    this.theme = theme
    this.useContingents = useContingents
  }

  toApi(): IForceApi {
    let heroes
    try {
      heroes = this.heroes.map((hero) => hero.toApi())
    } catch (e) {
      console.error('Failed to convert heroes to API models')
      throw e
    }

    let units
    try {
      units = this.units.map((unit) => unit.toApi())
    } catch (e) {
      console.error('Failed to convert units to API models')
      throw e
    }

    return {
      id: this.id,
      name: this.name,
      heroes,
      units,
      theme: this.theme,
      useContingents: this.useContingents,
    }
  }

  static fromApi(data: IForceApi): Force {
    return new Force(
      data.id,
      data.name,
      data.heroes.map((hero) => Hero.fromApi(hero)),
      data.units.map((unit) => Unit.fromApi(unit)),
      data.theme,
      data.useContingents,
    )
  }

  get items() {
    return [...this.heroes, ...this.units]
  }

  get themeColor(): ITheme {
    if (this.theme == null) return Themes.brown
    const selectedTheme = Object.values(Themes).find((x) => x.name === this.theme)
    return selectedTheme || Themes.brown
  }

  get points() {
    return this.heroesPoints + this.unitsPoints
  }

  get heroesPoints() {
    return this.heroes.reduce((acc, hero) => acc + hero.points, 0)
  }

  get unitsPoints() {
    return this.units.reduce((acc, unit) => acc + unit.points * unit.qty, 0)
  }

  get reputation() {
    return (
      this.heroes.reduce((acc, hero) => acc + hero.reputation, 0) +
      this.units.reduce((acc, unit) => acc + unit.reputation * unit.qty, 0)
    )
  }

  get reputationTokens() {
    return Math.max(8, Math.ceil(this.reputation / 4))
  }

  get contingentNames() {
    return Array.from(
      new Set([
        ...this.heroes.map((x) => x.contingent),
        ...this.units
          .map((x) => x.contingent.map((c) => c.value).flat())
          .flat()
          .filter((x) => x),
      ]),
    ).filter((c) => c)
  }

  get contingents() {
    return this.contingentNames.map((c) => ({
      name: c,
      heroes: this.heroes.filter((x) => x.contingent === c),
      units: this.units.filter((x) => x.contingent.some((x) => x.value === c)),
    }))
  }

  get contingentPoints() {
    // Each contingent must total at least 25% of the whole force.
    return this.contingentNames
      .filter((x) => x)
      .map((c) => ({
        name: c,
        points:
          this.heroes.filter((x) => x.contingent === c).reduce((mem, x) => mem + x.points, 0) +
          this.units.reduce((mem, u) => {
            const match = u.contingent.find((uc) => uc.value === c)
            return mem + (match ? u.points * match.qty : 0)
          }, 0),
      }))
      .map((c) => ({ ...c, ratio: `${Math.round((c.points / this.points) * 100)}%` }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  get validationErrors() {
    const errors = []
    // Heroes must not total more than one-third of the total points value of the Force (for example, in a 300 point Force, a maximum of 100 points may be Heroes).
    if (this.heroesPoints > this.points / 3) {
      errors.push(
        'Heroes must not total more than one-third of the total points value of the Force',
      )
    }

    // Some Heroic Traits are both rare and powerful; they are marked with an asterisk *. These Traits are limited to a maximum of one of each per 350 points of the total force.
    const rareAndPowerfulTraits = this.heroes.flatMap((hero) =>
      hero.traits.filter((trait) => trait.isRareAndPowerful),
    )
    // Group by trair name
    const rareAndPowerfulTraitsGrouped = rareAndPowerfulTraits.reduce(
      (acc, trait) => {
        acc[trait.name] = (acc[trait.name] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const maxSingleRareAndPowerfulTraitCount = Math.max(
      ...Object.values(rareAndPowerfulTraitsGrouped),
    )
    if (maxSingleRareAndPowerfulTraitCount > Math.ceil(this.points / 350)) {
      errors.push(
        'Some Heroic Traits are both rare and powerful; they are limited to a maximum of one of each per 350 points of the total force',
      )
    }

    // Flying is limited to a maximum of two Units or Heroes per 350 points of the total Force.
    const flyingUnits = this.units.filter((unit) =>
      unit.traits.some((trait) => trait.name === 'Flying'),
    )
    const flyingHeroes = this.heroes.filter((hero) =>
      hero.traits.some((trait) => trait.name === 'Flying'),
    )
    if (flyingUnits.length + flyingHeroes.length > Math.ceil(this.points / 350)) {
      errors.push(
        'Flying is limited to a maximum of two Units or Heroes per 350 points of the total Force',
      )
    }

    errors.push(...this.heroes.flatMap((hero) => hero.validationErrors))
    errors.push(...this.units.flatMap((unit) => unit.validationErrors))

    // Contingent rules
    if (this.useContingents) {
      // Each hero and unit must be assigned to a contingent.
      if (this.heroes.some((x) => x.contingent == null)) {
        errors.push('Every Unit and Hero in your Force must be assigned to a Contingent')
      }

      // Each contingent must have a hero.
      if (!this.contingentNames.every((c) => this.heroes.some((x) => x.contingent === c))) {
        errors.push('Each Contingent must be led by a Hero.')
      }

      // Each contingent must have a unit.
      if (
        !this.contingentNames.every((c) =>
          this.units.some((x) => x.contingent.some((y) => y.value === c)),
        )
      ) {
        errors.push('Each contingent must have at least one unit.')
      }

      // Each contingent must total at least 25% of the whole force.
      if (!this.contingentPoints.map((x) => x.points).every((pts) => pts >= this.points / 4)) {
        errors.push(
          `Each Contingent must contain Units and Heroes totalling at least 25% of the Points value of the whole Force. (${this.contingentPoints.map((cp) => `${cp.name} = ${cp.points}pts`).join(', ')})`,
        )
      }
    }

    return errors
  }
}
