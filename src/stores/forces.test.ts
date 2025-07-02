import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useForcesStore } from './forces'
import Force from '@/models/Force'
import HeroTrait from '@/models/HeroTrait'
import UnitTrait from '@/models/UnitTrait'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
}
global.localStorage = localStorageMock as any

describe('Forces Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.clear.mockClear()
  })

  it('should initialize with empty data when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    
    expect(store.forces).toHaveLength(1) // Sample force is created
    expect(store.customHeroTraits).toHaveLength(0)
    expect(store.customUnitTraits).toHaveLength(0)
  })

  it('should add a new force', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const initialCount = store.forces.length
    
    const newForce = new Force('test-id', 'Test Force', [], [], '#000000')
    store.addForce(newForce)
    
    expect(store.forces).toHaveLength(initialCount + 1)
    expect(store.forces.find(f => f.id === 'test-id')).toBeDefined()
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('should update an existing force', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const force = new Force('test-id', 'Test Force', [], [], '#000000')
    store.addForce(force)
    
    force.name = 'Updated Force'
    store.updateForce(force)
    
    const updatedForce = store.forces.find(f => f.id === 'test-id')
    expect(updatedForce?.name).toBe('Updated Force')
  })

  it('should delete a force', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const force = new Force('test-id', 'Test Force', [], [], '#000000')
    store.addForce(force)
    
    const initialCount = store.forces.length
    store.deleteForce('test-id')
    
    expect(store.forces).toHaveLength(initialCount - 1)
    expect(store.forces.find(f => f.id === 'test-id')).toBeUndefined()
  })

  it('should add custom hero trait', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const trait = new HeroTrait(
      'Test Trait',
      'Test description',
      10,
      false,
      undefined,
      true
    )
    
    store.addCustomHeroTrait(trait)
    
    expect(store.customHeroTraits).toHaveLength(1)
    expect(store.customHeroTraits[0].name).toBe('Test Trait')
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('should add custom unit trait', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const trait = new UnitTrait(
      'Test Unit Trait',
      'Test description',
      [5],
      false,
      undefined,
      true
    )
    
    store.addCustomUnitTrait(trait)
    
    expect(store.customUnitTraits).toHaveLength(1)
    expect(store.customUnitTraits[0].name).toBe('Test Unit Trait')
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('should get force by id', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const force = new Force('test-id', 'Test Force', [], [], '#000000')
    store.addForce(force)
    
    const foundForce = store.getForceById('test-id')
    expect(foundForce).toBeDefined()
    expect(foundForce?.name).toBe('Test Force')
  })

  it('should duplicate a force', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const store = useForcesStore()
    const force = new Force('test-id', 'Test Force', [], [], '#000000')
    store.addForce(force)
    
    const initialCount = store.forces.length
    const duplicated = store.duplicateForce('test-id')
    
    expect(store.forces).toHaveLength(initialCount + 1)
    expect(duplicated).toBeDefined()
    expect(duplicated?.name).toBe('Test Force (Copy)')
    expect(duplicated?.id).not.toBe('test-id')
  })
})