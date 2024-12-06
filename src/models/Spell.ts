export default class Spell {
  constructor(
    public name: string,
    public pointCost: number,
  ) {}

  get formattedName(): string {
    return `${this.name} (${this.pointCost}pts)`
  }
}

export const Spells: Record<string, Spell> = {
  BarrierOfWarding: new Spell('Barrier of Warding', 8),
  BattleRage: new Spell('Battle Rage', 8),
  CloudOfFear: new Spell('Cloud of Fear', 4),
  Curse: new Spell('Curse', 4),
  DispelMagic: new Spell('Dispel Magic', 5),
  Enchantment: new Spell('Enchantment', 8),
  MagicMissile: new Spell('Magic Missile', 8),
  MarshWood: new Spell('Marsh Wood', 10),
  Protection: new Spell('Protection', 5),
  RaiseDead: new Spell('Raise Dead', 10),
  Summoning: new Spell('Summoning', 4),
  Teleport: new Spell('Teleport', 2),
  WallOfMist: new Spell('Wall of Mist', 3),
  Weakness: new Spell('Weakness', 6),
}
