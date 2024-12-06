export interface IMissileType {
  id: string
  name: string
  heroPointCost: Array<number>
  range: number
}

export const MissileTypes: Record<string, IMissileType> = {
  None: {
    id: 'NO',
    name: 'None',
    heroPointCost: [0, 0, 0, 0],
    range: 0,
  },
  Javelins: {
    id: 'JV',
    name: 'Javelins',
    heroPointCost: [2, 3, 4, 5],
    range: 1,
  },
  ShortOrMountedBow: {
    id: 'SB',
    name: 'Short Bow / Mounted Bow',
    heroPointCost: [3, 4, 5, 6],
    range: 2,
  },
  BowOrMountedElfBow: {
    id: 'BW',
    name: 'Bow / Mounted Elf Bow',
    heroPointCost: [4, 5, 6, 7],
    range: 3,
  },
  BowOrSling: {
    id: 'BS',
    name: 'Bow or Sling',
    heroPointCost: [4, 5, 6, 7],
    range: 3,
  },
  ElfBowOrCrossbowOrLongbow: {
    id: 'EB',
    name: 'Elf Bow / Crossbow / Longbow',
    heroPointCost: [5, 6, 7, 8],
    range: 4,
  },
  Boulders: {
    id: 'BD',
    name: 'Boulders',
    heroPointCost: [],
    range: 3,
  },
  DragonsBreath: {
    id: 'DB',
    name: "Dragon's Breath",
    heroPointCost: [],
    range: 3,
  },
  LightArtillery: {
    id: 'LA',
    name: 'Light Artillery',
    heroPointCost: [],
    range: 4,
  },
  HeavyArtillery: {
    id: 'HA',
    name: 'Heavy Artillery',
    heroPointCost: [],
    range: 5,
  },
}

export const HeroMissileTypes: Array<IMissileType> = [
  MissileTypes.None,
  MissileTypes.Javelins,
  MissileTypes.ShortOrMountedBow,
  MissileTypes.BowOrMountedElfBow,
  MissileTypes.ElfBowOrCrossbowOrLongbow,
]
