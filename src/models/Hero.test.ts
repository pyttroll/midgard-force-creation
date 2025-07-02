import { describe, it, expect } from 'vitest'
import Hero from './Hero'
import type { IHeroStatus } from './HeroStatuses'
import type HeroTrait from './HeroTrait'
import { MissileTypes } from './Missiles'

describe('Hero', () => {
  const mockStatus: IHeroStatus = {
    name: 'Level 1',
    level: 1,
    points: 20,
    formattedName: 'Level 1 Hero'
  }

  const mockTrait: HeroTrait = {
    name: 'Test Trait',
    description: 'A test trait',
    pointCost: 5,
    isCustom: false,
    isPointCostBasedOnMissileRange: false,
    isRareAndPowerful: false,
    shortName: 'Test Trait',
    formattedName: 'Test Trait',
    toApi: () => ({}),
    modifiers: {}
  } as HeroTrait

  it('should create a hero with basic properties', () => {
    const hero = new Hero('Test Hero', mockStatus, [])
    
    expect(hero.name).toBe('Test Hero')
    expect(hero.status).toBe(mockStatus)
    expect(hero.traits).toEqual([])
  })

  it('should calculate stamina based on level', () => {
    const hero1 = new Hero('Hero 1', mockStatus, [])
    expect(hero1.stamina).toBe(1)

    const hero2 = new Hero('Hero 2', { ...mockStatus, level: 2 }, [])
    expect(hero2.stamina).toBe(2)
  })

  it('should calculate combat dice based on level', () => {
    const hero = new Hero('Test Hero', mockStatus, [])
    expect(hero.combatDice).toBe(1)
  })

  it('should calculate shooting dice based on missile type', () => {
    const heroWithoutMissiles = new Hero('Hero 1', mockStatus, [])
    expect(heroWithoutMissiles.shootingDice).toBe(0)

    const heroWithMissiles = new Hero('Hero 2', mockStatus, [], MissileTypes.BowOrSling)
    expect(heroWithMissiles.shootingDice).toBe(1)
  })

  it('should calculate armour correctly', () => {
    const hero = new Hero('Test Hero', mockStatus, [], undefined, 1)
    expect(hero.armour).toBe(4) // 3 base + 1 modifier
  })

  it('should format contingent correctly', () => {
    const hero = new Hero('Test Hero', mockStatus, [], undefined, undefined, undefined, '1')
    expect(hero.contingentFormatted).toBe('I')

    const hero2 = new Hero('Test Hero', mockStatus, [], undefined, undefined, undefined, '2')
    expect(hero2.contingentFormatted).toBe('II')
  })

  it('should validate successfully with no sorcery errors', () => {
    const hero = new Hero('Test Hero', mockStatus, [])
    
    expect(() => hero.validate()).not.toThrow()
  })

  it('should validate and throw error for spells without sorcery', () => {
    const mockSpell = { 
      name: 'Test Spell', 
      pointCost: 5,
      formattedName: 'Test Spell',
      description: 'Test spell description'
    }
    const hero = new Hero('Test Hero', mockStatus, [], undefined, undefined, [mockSpell])
    
    expect(() => hero.validate()).toThrow('Heroes can only have spells if they have the Sorcery Trait')
  })

  it('should calculate points correctly', () => {
    const hero = new Hero('Test Hero', mockStatus, [mockTrait], MissileTypes.Javelins, 1)
    const expectedPoints = 20 + 2 + 2 + 5 // status + armour + missile + trait
    expect(hero.points).toBe(expectedPoints)
  })

  it('should calculate reputation correctly', () => {
    const hero = new Hero('Test Hero', mockStatus, [])
    expect(hero.reputation).toBe(Math.max(1, Math.round(20 * 0.1)))
  })

  it('should convert to API format correctly', () => {
    const hero = new Hero('Test Hero', mockStatus, [mockTrait], MissileTypes.BowOrSling, 1, undefined, '1')
    const api = hero.toApi()
    
    expect(api.name).toBe('Test Hero')
    expect(api.status).toBe(mockStatus)
    expect(api.traits).toEqual(['Test Trait'])
    expect(api.missileType).toBe(MissileTypes.BowOrSling)
    expect(api.armourModifier).toBe(1)
    expect(api.contingent).toBe('1')
  })
})