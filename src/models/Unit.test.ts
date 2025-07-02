import { describe, it, expect } from 'vitest'
import Unit from './Unit'
import UnitProfile from './UnitProfile'
import UnitTrait from './UnitTrait'
import type { IUnitOption } from './UnitProfile'
import type { IContingentAllocation } from './Contingent'
import { MissileTypes } from './Missiles'

describe('Unit', () => {
  const mockTrait: UnitTrait = new UnitTrait(
    'Test Trait',
    'A test trait',
    [5],
    false,
    undefined,
    true
  )

  const mockProfile: UnitProfile = new UnitProfile(
    'Warriors',
    'Test Unit',
    10,
    3,
    2,
    1,
    4,
    2,
    [{ trait: mockTrait, points: 5 }]
  )

  const mockOption: IUnitOption = {
    id: 1,
    name: 'Test Option',
    points: 2,
    modifiers: {}
  }

  const mockContingent: IContingentAllocation[] = [
    { value: 'I', qty: 2 },
    { value: 'II', qty: 1 }
  ]

  it('should create a unit with basic properties', () => {
    const unit = new Unit('Test Unit', 3, mockProfile, [], [])
    
    expect(unit.name).toBe('Test Unit')
    expect(unit.qty).toBe(3)
    expect(unit.profile).toBe(mockProfile)
    expect(unit.traits).toEqual([])
    expect(unit.options).toEqual([])
  })

  it('should format contingent correctly', () => {
    const unit = new Unit('Test Unit', 3, mockProfile, [], [], mockContingent)
    
    expect(unit.contingentFormatted).toBe('I:2, II:1')
  })

  it('should return empty string for contingentFormatted when no contingent', () => {
    const unit = new Unit('Test Unit', 3, mockProfile, [], [])
    
    expect(unit.contingentFormatted).toBe('')
  })

  it('should return missiles from missileType', () => {
    const profileWithMissiles = new UnitProfile(
      'Skirmishers',
      'Archer Unit',
      10,
      3,
      2,
      1,
      4,
      2,
      [],
      undefined,
      MissileTypes.BowOrSling
    )
    const unit = new Unit('Archer Unit', 3, profileWithMissiles, [], [])
    
    expect(unit.missiles).toBe(MissileTypes.BowOrSling)
  })

  it('should validate successfully with no errors', () => {
    const unit = new Unit('Test Unit', 3, mockProfile, [], [])
    
    expect(() => unit.validate()).not.toThrow()
  })

  it('should calculate points correctly', () => {
    const unit = new Unit('Test Unit', 1, mockProfile, [mockTrait], [mockOption])
    
    expect(unit.points).toBe(17) // 10 (profile) + 5 (trait) + 2 (option)
  })

  it('should calculate reputation correctly', () => {
    const unit = new Unit('Test Unit', 1, mockProfile, [], [])
    
    expect(unit.reputation).toBe(1) // Math.max(1, Math.round(10 * 0.1))
  })

  it('should convert to API format correctly', () => {
    const unit = new Unit('Test Unit', 3, mockProfile, [mockTrait], [mockOption], mockContingent)
    const api = unit.toApi()
    
    expect(api.name).toBe('Test Unit')
    expect(api.qty).toBe(3)
    expect(api.profile).toBe('Test Unit')
    expect(api.traits).toEqual(['Test Trait'])
    expect(api.options).toEqual([1])
    expect(api.contingent).toEqual(mockContingent)
  })
})