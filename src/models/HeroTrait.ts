interface IHeroTrait {
  name: string
  description?: string
  isRareAndPowerful: boolean
  pointCost: number | Array<number>
  limit?: number
  isPointCostBasedOnMissileRange?: boolean
  modifiers?: Record<string, number>
  isCustom?: boolean
}

export default class HeroTrait {
  constructor(
    public name: string,
    public description: string,
    public isRareAndPowerful: boolean,
    public pointCost: number | Array<number>,
    public limit?: number,
    public isPointCostBasedOnMissileRange?: boolean,
    public modifiers?: Record<string, number>,
    public isCustom?: boolean,
  ) {}

  get shortName(): string {
    return `${this.name}${this.isRareAndPowerful ? '*' : ''} ${this.isCustom ? '(custom)' : ''}`
  }

  get formattedName(): string {
    return `${this.name}${this.isRareAndPowerful ? '*' : ''} (${this.isPointCostBasedOnMissileRange ? 'Based on missiles' : `${this.pointCost}pts`})`
  }

  static fromObject(data: IHeroTrait): HeroTrait {
    return new HeroTrait(
      data.name,
      data.description,
      data.isRareAndPowerful,
      data.pointCost,
      data.limit,
      data.isPointCostBasedOnMissileRange,
      data.modifiers,
      data.isCustom,
    )
  }

  toApi(): IHeroTrait {
    return {
      name: this.name,
      description: this.description,
      isRareAndPowerful: this.isRareAndPowerful,
      pointCost: this.pointCost,
      limit: this.limit,
      isPointCostBasedOnMissileRange: this.isPointCostBasedOnMissileRange,
      modifiers: this.modifiers,
      isCustom: this.isCustom,
    }
  }
}

export const HeroTraits: Record<string, HeroTrait> = {
  Amphibious: HeroTrait.fromObject({
    name: 'Amphibious',
    isRareAndPowerful: false,
    pointCost: 2,
    description:
      'Can move across water (Impassable Terrain). Gain Agile trait in watery Rough Terrain [pg66]',
  }),
  ArmyCommander: HeroTrait.fromObject({
    name: 'Army Commander',
    isRareAndPowerful: false,
    pointCost: 0,
    limit: 1,
    modifiers: { reputation: 1 },
    description: 'Can influence any friendly Unit within 2 ST; +1 Reputation [pg71]',
  }),
  Artillerist: HeroTrait.fromObject({
    name: 'Artillerist',
    isRareAndPowerful: false,
    pointCost: [2, 4, 6, 8],
    description:
      'May attach to a friendly Monstrosity (Artillery) Unit and influence it using Mighty Deeds [pg71]',
  }),
  AuraOfDread: HeroTrait.fromObject({
    name: 'Aura of Dread',
    isRareAndPowerful: false,
    pointCost: 12,
    description:
      'Enemy cannot use support saves from friendly Units in Melee Combat. Support saves may still be used from terrain and traits [pg66]',
  }),
  BattleSmiter: HeroTrait.fromObject({
    name: 'Battle Smiter',
    isRareAndPowerful: false,
    pointCost: [2, 4, 8, 10],
    description: '+1 Combat Dice in single combats [pg71]',
  }),
  BeastMaster: HeroTrait.fromObject({
    name: 'Beast Master',
    isRareAndPowerful: false,
    pointCost: 5,
    description:
      'May attach to a friendly Monstrosity (non-Artillery) Unit and influence it using Mighty Deeds [pg71]',
  }),
  Big: HeroTrait.fromObject({
    name: 'Big',
    isRareAndPowerful: false,
    pointCost: 0,
    description:
      '+1 Combat Dice in Melee Combat but +1 Shooting Dice to enemy when targeted [pg66]',
  }),
  Brutal: HeroTrait.fromObject({
    name: 'Brutal',
    isRareAndPowerful: false,
    pointCost: [6, 10, 14, 18],
    description: '4+ to hit in Melee Combat [pg66]',
  }),
  DivineIntervention: HeroTrait.fromObject({
    name: 'Divine Intervention',
    isRareAndPowerful: true,
    pointCost: 5,
    description:
      'Roll a d6 if killed: 1 = dead; 2-6 = saved – remove from table and lose one less Reputation than usual [pg71]',
  }),
  Fated: HeroTrait.fromObject({
    name: 'Fated',
    isRareAndPowerful: false,
    pointCost: 0,
    description:
      'May not use Mighty Deeds to reroll Risk to Heroes tests. If killed in Melee Combat or single combat, add +3 to Hero Death roll [pg72]',
  }),
  FavourOfTheGods: HeroTrait.fromObject({
    name: 'Favour of the Gods',
    isRareAndPowerful: true,
    pointCost: 3,
    description: 'Once per game, may gain an additional Mighty Deed [pg72]',
  }),
  Fearsome: HeroTrait.fromObject({
    name: 'Fearsome',
    isRareAndPowerful: false,
    pointCost: 3,
    description:
      'Enemy will retreat 1 ST in Melee Combat unless also fearsome. Fearsome troops and supports may pursue defeated enemy 1 ST [pg66]',
  }),
  Flying: HeroTrait.fromObject({
    name: 'Flying',
    isRareAndPowerful: false,
    pointCost: [5, 8, 11, 14],
    description: 'May use Flying rules, moving 4 ST per Movement Action [pg76]',
  }),
  HelsBreath: HeroTrait.fromObject({
    name: 'Hel’s Breath',
    isRareAndPowerful: true,
    pointCost: 2,
  }),
  HoldFast: HeroTrait.fromObject({
    name: 'Hold Fast',
    isRareAndPowerful: false,
    pointCost: 4,
    description:
      'Once per game, may attempt to restore 1 Stamina to a damaged friendly Unit within 2 ST upon passing a Command Test and expending 1 Mighty Deed [pg72]',
  }),
  Inspiring: HeroTrait.fromObject({
    name: 'Inspiring',
    isRareAndPowerful: false,
    pointCost: 6,
    description:
      'If not in Melee Combat, may support friendly Units with ½ ST.  Each Mighty Deed expended = 2 support dice [pg72]',
  }),
  IForetellMightyDeeds: HeroTrait.fromObject({
    name: 'I Foretell Mighty Deeds',
    isRareAndPowerful: true,
    pointCost: 3,
    description:
      'Once per game, may expend 1 Mighty Deed in Phase 7; a friendly Hero gains +d3 additional Mighty Deeds in Phase 1 of the next turn [72]',
  }),
  LegendaryMissile: HeroTrait.fromObject({
    name: 'Legendary Missile',
    isRareAndPowerful: true,
    pointCost: [2, 4, 6, 8],
    isPointCostBasedOnMissileRange: true,
    description:
      'When shooting, a hit from a single Legendary Missile dice causes 1 Stamina point of damage, regardless of Armour [pg73]',
  }),
  LegendaryWeapon: HeroTrait.fromObject({
    name: 'Legendary Weapon',
    isRareAndPowerful: true,
    pointCost: 8,
    description:
      'In Melee Combat, a hit from a single Legendary Weapon dice causes 1 Stamina point of damage, regardless of Armour. In single combat, a hit from a single Legendary Weapon dice counts as  2 hits [pg73]',
  }),
  Marksman: HeroTrait.fromObject({
    name: 'Marksman',
    isRareAndPowerful: false,
    pointCost: [2, 2, 3, 3],
    isPointCostBasedOnMissileRange: true,
    description:
      '+1 Shooting Dice (can be added as a Combat Dice bonus in a charge situation) [pg67]',
  }),
  Mounted: HeroTrait.fromObject({
    name: 'Mounted',
    isRareAndPowerful: false,
    pointCost: 2,
    description: 'May move 2 ST per Movement Action [pg73]',
  }),
  NonCombattant: HeroTrait.fromObject({
    name: 'Non-Combattant',
    isRareAndPowerful: false,
    pointCost: 0,
    description:
      'May not use Mighty Deeds to add Combat Dice. May refuse challenges to single combat and Evade charging enemies without loss of Reputation [pg73]',
  }),
  Omens: HeroTrait.fromObject({
    name: 'Omens',
    isRareAndPowerful: false,
    pointCost: 2,
    description: 'May expend 1 Mighty Deed in Phase 1 of Turn 1 to read Omens [pg73]',
  }),
  OnMyCommandUnleashHell: HeroTrait.fromObject({
    name: 'On My Command, Unleash Hell',
    isRareAndPowerful: false,
    pointCost: 4,
    description:
      'Once per game, may expend 1 Mighty Deed when attached to a missile-armed Unit armed with bows; Unit gains +d6 Shooting Dice [pg74]',
  }),
  Proud: HeroTrait.fromObject({
    name: 'Proud',
    isRareAndPowerful: false,
    pointCost: 0,
    description:
      'May never refuse a challenge to single combat. Gains +1 Reputation if kills an enemy Hero in single combat [pg74]',
  }),
  Sorcery: HeroTrait.fromObject({
    name: 'Sorcery',
    isRareAndPowerful: true,
    pointCost: 0,
    description: 'May use spells [pg81]',
  }),
  TodayWeFightToWin: HeroTrait.fromObject({
    name: 'Today We Fight to Win',
    isRareAndPowerful: false,
    pointCost: 4,
    description:
      'Once per game, may expend 1 Mighty Deed when attached to a Unit in Melee Combat; Unit gains +d6 Combat Dice [pg74]',
  }),
  WithMe: HeroTrait.fromObject({
    name: 'With Me',
    isRareAndPowerful: false,
    pointCost: 4,
    description:
      'Once per game, may expend 1 Mighty Deed at the start of own Movement Phase; all friendly Units within 2 ST under the Hero’s command automatically pass any Command Tests for movement [pg74]',
  }),
}

export function getHeroTraits(): HeroTrait[] {
  let customHeroTraits: Array<HeroTrait> = []
  if (localStorage.getItem('forces')) {
    const traits = JSON.parse(localStorage.getItem('forces')).customHeroTraits
    if (traits) {
      customHeroTraits = traits.map((trait: any) => HeroTrait.fromObject(trait))
    }
  }
  const traits = Object.values(HeroTraits)
    .concat(customHeroTraits)
    .sort((a, b) => a.name.localeCompare(b.name))

  return traits
}
