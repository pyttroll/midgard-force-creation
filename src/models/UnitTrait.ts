export interface IUnitTrait {
  name: string
  description: string
  pointCost?: Array<number>
  isPointCostBasedOnMissileRange?: boolean
  discards?: string[]
  isCustom?: boolean
}

export default class UnitTrait {
  constructor(
    public name: string,
    public description: string,
    public pointCost?: Array<number>,
    public isPointCostBasedOnMissileRange?: boolean,
    public discards?: string[],
    public isCustom?: boolean,
  ) {}

  get shortName(): string {
    return `${this.name} ${this.isCustom ? '(custom)' : ''}`
  }

  static fromObject(obj: IUnitTrait) {
    return new UnitTrait(
      obj.name,
      obj.description,
      obj.pointCost,
      obj.isPointCostBasedOnMissileRange,
      obj.discards,
      obj.isCustom,
    )
  }

  toApi() {
    return {
      name: this.name,
      description: this.description,
      pointCost: this.pointCost,
      isPointCostBasedOnMissileRange: this.isPointCostBasedOnMissileRange,
      discards: this.discards,
      isCustom: this.isCustom,
    }
  }
}

export const UnitTraits: Record<string, UnitTrait> = {
  Agile: UnitTrait.fromObject({
    name: 'Agile',
    description: 'No penalties in Rough Terrain [pg67]',
  }),
  Aloof: UnitTrait.fromObject({
    name: 'Aloof',
    description:
      'Cannot be influenced by friendly Unites (unless attached to the Unit with the  Artillerist or Beast Master trait, as appropriate) [pg67]',
  }),
  Amphibious: UnitTrait.fromObject({
    name: 'Amphibious',
    description:
      'Can move across water (Impassable Terrain). Gain Agile trait in watery Rough Terrain [pg66]',
  }),
  AuraOfDread: UnitTrait.fromObject({
    name: 'Aura of Dread',
    description:
      'Enemy cannot use support saves from friendly Units in Melee Combat. Support saves may still be used from terrain and traits [pg66]',
  }),
  Big: UnitTrait.fromObject({
    name: 'Big',
    discards: ['Towering'],
    description:
      '+1 Combat Dice in Melee Combat but +1 Shooting Dice to enemy when targeted [pg66]',
  }),
  Blast: UnitTrait.fromObject({
    name: 'Blast',
    description:
      'Does not halve Shooting Dice at targets in 1 ST wide corridor to the front. Does not halve Shooting Dice when a target is obscured by cover.  May not be used in a charge situation [pg67]',
  }),
  Brittle: UnitTrait.fromObject({
    name: 'Brittle',
    description:
      'Must take a Command Test or break when forced to retreat with two or less Stamina points [pg68]',
  }),
  Brutal: UnitTrait.fromObject({
    name: 'Brutal',
    description: '4+ to hit in Melee Combat [pg66]',
  }),
  CounterCharge: UnitTrait.fromObject({
    name: 'Counter Charge',
    description:
      'If charged to the front in open terrain, Unit may take a Command Test to counter charge. Unit is given a Charging or Winning marker but is not moved. Counter charging Unit may not use missiles; counter charging units do not gain Reputation [pg68]',
  }),
  Disengage: UnitTrait.fromObject({
    name: 'Disengage',
    description:
      'After Melee Combat, Unit may disengage if in combat with enemy Warrior, Skirmisher or Monstrosity Units. Unit must pass a Command Test; if passed, may move back 1 ST [pg68]',
  }),
  Drilled: UnitTrait.fromObject({
    name: 'Drilled',
    description:
      'Unit rolls one less dice than usual for its first Command Test during its own Movement Phase [pg68]',
  }),
  Evade: UnitTrait.fromObject({
    name: 'Evade',
    description:
      'If charged, Unit may take a Command Test to Evade.  If passed, evading Unit is moved 1 Movement Action away from chargers [pg68]',
  }),
  Fearsome: UnitTrait.fromObject({
    name: 'Fearsome',
    description:
      'Enemy will retreat 1 ST in Melee Combat unless also fearsome. Fearsome troops and supports may pursue defeated enemy 1 ST [pg66]',
  }),
  Fixed: UnitTrait.fromObject({
    name: 'Fixed',
    description:
      'If hit by shooting and fails Command Test, Unit must take Shot marker instead of retreating. Unit can not charge.  Destroyed if Unit loses a Melee Combat [pg68]',
  }),
  Flying: UnitTrait.fromObject({
    name: 'Flying',
    description: 'May use Flying rules, moving 4 ST per Movement Action [pg76]',
  }),
  HelsBreath: UnitTrait.fromObject({
    name: 'Hel’s Breath',
    description:
      'An enemy Unit hit by shooting must roll 2d6 for its Command Test, using the lower score [pg68]',
  }),
  Impetuous: UnitTrait.fromObject({
    name: 'Impetuous',
    description:
      'Must charge enemy within Killing Zone at the start of Movement Phase. Add +1 Combat Dice if at full strength with a Charging or Winning marker. Must pursue enemy defeated in Melee Combat [pg68]',
  }),
  Marksman: UnitTrait.fromObject({
    name: 'Marksman',
    pointCost: [2, 2, 3, 3],
    isPointCostBasedOnMissileRange: true,
    description:
      '+1 Shooting Dice (can be added as a Combat Dice bonus in a charge situation) [pg67]',
  }),
  Pikes: UnitTrait.fromObject({
    name: 'Pikes',
    description:
      '+2 integral support save dice against Light Riders, Heavy Riders, a Towering Monstrosity or a Swooping Attack from Flying troops. Support still applies against an enemy with Aura of Dread trait [pg69]',
  }),
  Relentless: UnitTrait.fromObject({
    name: 'Relentless',
    description:
      'Never take Command Tests from shooting. Never retreat when losing a Melee Combat – lose an extra point of Stamina instead. Must pursue if winning a Melee Combat [pg69]',
  }),
  Reluctant: UnitTrait.fromObject({
    name: 'Reluctant',
    description: 'Must pass a Command Test for every Movement Action [pg69]',
  }),
  Replacements: UnitTrait.fromObject({
    name: 'Replacements',
    description:
      'Can attempt to swap places with another Unit with the Replacements trait upon passing a Command Test [pg69]',
  }),
  Slow: UnitTrait.fromObject({
    name: 'Slow',
    description: 'May only move once per Movement Phase [pg70]',
  }),
  SpearsAsTribute: UnitTrait.fromObject({
    name: 'Spears as Tribute',
    description: 'Add +2 Combat Dice until Unit loses any Stamina [pg70]',
  }),
  Stampede: UnitTrait.fromObject({
    name: 'Stampede',
    description:
      'If reduced to 1 Stamina, retreats and fails Command Test for breaking, will stampede.  Move 2 ST directly to rear.  Units in path must roll Command Test on 2d6, choosing lowest, and lose a point of Stamina if failed.  Unites in path must roll 2d6 for Risk to Unites and choose lowest dice. Stampeding Unit is then removed [pg70]',
  }),
  Steadfast: UnitTrait.fromObject({
    name: 'Steadfast',
    description: 'Does not take a Command Test if retreated into by friendly Units [pg70]',
  }),
  ThunderousCharge: UnitTrait.fromObject({
    name: 'Thunderous Charge',
    description:
      'Hits on 4+ in its first round of Melee Combat during the game if fighting to the front in open terrain [pg71]',
  }),
  Towering: UnitTrait.fromObject({
    name: 'Towering',
    discards: ['Big'],
    description:
      '+2 Combat Dice in Melee Combat but +2 Shooting Dice to enemy when targeted. May collapse if destroyed [pg71]',
  }),
}

export function getUnitTraits(): UnitTrait[] {
  let customUnitTraits: Array<UnitTrait> = []
  if (localStorage.getItem('forces')) {
    const traits = JSON.parse(localStorage.getItem('forces')).customUnitTraits
    if (traits) {
      customUnitTraits = traits.map((trait) => UnitTrait.fromObject(trait))
    }
  }
  const traits = Object.values(UnitTraits)
    .concat(customUnitTraits)
    .sort((a, b) => a.name.localeCompare(b.name))

  return traits
}
