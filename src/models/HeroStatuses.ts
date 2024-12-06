export interface IHeroStatus {
  name: string
  level: number
  points: number
  formattedName: string
}

export const HeroStatuses: Record<string, IHeroStatus> = {
  Champion: {
    name: 'Champion',
    level: 1,
    points: 10,
    formattedName: 'Champion (Level 1)',
  },
  MinorHero: {
    name: 'Minor Hero',
    level: 2,
    points: 15,
    formattedName: 'Minor Hero (Level 2)',
  },
  MajorHero: {
    name: 'Major Hero',
    level: 3,
    points: 25,
    formattedName: 'Major Hero (Level 3)',
  },
  LegendaryHero: {
    name: 'Legendary Hero',
    level: 4,
    points: 35,
    formattedName: 'Legendary Hero (Level 4)',
  },
}
