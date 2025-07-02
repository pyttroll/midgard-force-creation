import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Force from '@/models/Force'
import Hero from '@/models/Hero'
import Unit from '@/models/Unit'
import HeroTrait from '@/models/HeroTrait'
import UnitTrait from '@/models/UnitTrait'
import { HeroStatuses } from '@/models/HeroStatuses'
import UnitProfiles from '@/models/UnitProfiles'
import { HeroTraits } from '@/models/HeroTrait'
import { UnitTraits } from '@/models/UnitTrait'

export const useForcesStore = defineStore('forces', () => {
  // State
  const forces = ref<Force[]>([])
  const customHeroTraits = ref<HeroTrait[]>([])
  const customUnitTraits = ref<UnitTrait[]>([])
  const currentForce = ref<Force | null>(null)
  
  // Getters
  const totalForces = computed(() => forces.value.length)
  
  const getForceById = computed(() => {
    return (id: string) => forces.value.find(force => force.id === id)
  })
  
  const getAllHeroTraits = computed(() => {
    return [
      ...Object.values(HeroTraits),
      ...customHeroTraits.value
    ]
  })
  
  const getAllUnitTraits = computed(() => {
    return [
      ...Object.values(UnitTraits),
      ...customUnitTraits.value
    ]
  })
  
  // Actions
  function loadFromStorage() {
    const forcesJSON = localStorage.getItem('forces')
    
    if (!forcesJSON) {
      // Initialize with sample data
      initializeWithSampleData()
      return
    }
    
    try {
      const data = JSON.parse(forcesJSON)
      
      // Load forces
      forces.value = data.forces?.map((force: any) => Force.fromApi(force)) || []
      
      // Load custom traits
      customHeroTraits.value = data.customHeroTraits?.map((trait: any) => 
        HeroTrait.fromObject(trait)
      ) || []
      
      customUnitTraits.value = data.customUnitTraits?.map((trait: any) => 
        UnitTrait.fromObject(trait)
      ) || []
      
    } catch (error) {
      console.error('Error loading forces from storage:', error)
      initializeWithSampleData()
    }
  }
  
  function saveToStorage() {
    try {
      const data = {
        forces: forces.value.map(force => force.toApi()),
        customHeroTraits: customHeroTraits.value.map(trait => trait.toApi()),
        customUnitTraits: customUnitTraits.value.map(trait => trait.toApi())
      }
      
      localStorage.setItem('forces', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving forces to storage:', error)
      throw error
    }
  }
  
  function addForce(force: Force) {
    forces.value.push(force)
    saveToStorage()
  }
  
  function updateForce(updatedForce: Force) {
    const index = forces.value.findIndex(force => force.id === updatedForce.id)
    if (index !== -1) {
      forces.value[index] = updatedForce
      saveToStorage()
    }
  }
  
  function deleteForce(forceId: string) {
    const index = forces.value.findIndex(force => force.id === forceId)
    if (index !== -1) {
      forces.value.splice(index, 1)
      saveToStorage()
    }
  }
  
  function duplicateForce(forceId: string) {
    const force = getForceById.value(forceId)
    if (force) {
      const duplicated = Force.fromApi(force.toApi())
      duplicated.id = crypto.randomUUID()
      duplicated.name = `${force.name} (Copy)`
      addForce(duplicated)
      return duplicated
    }
  }
  
  function setCurrentForce(force: Force | null) {
    currentForce.value = force
  }
  
  function addCustomHeroTrait(trait: HeroTrait) {
    customHeroTraits.value.push(trait)
    saveToStorage()
  }
  
  function addCustomUnitTrait(trait: UnitTrait) {
    customUnitTraits.value.push(trait)
    saveToStorage()
  }
  
  function removeCustomHeroTrait(traitName: string) {
    const index = customHeroTraits.value.findIndex(trait => trait.name === traitName)
    if (index !== -1) {
      customHeroTraits.value.splice(index, 1)
      saveToStorage()
    }
  }
  
  function removeCustomUnitTrait(traitName: string) {
    const index = customUnitTraits.value.findIndex(trait => trait.name === traitName)
    if (index !== -1) {
      customUnitTraits.value.splice(index, 1)
      saveToStorage()
    }
  }
  
  function initializeWithSampleData() {
    // Create sample forces - simplified version
    const sampleForce = new Force(
      crypto.randomUUID(),
      'Sample Force',
      [],
      [],
      '#1f2937'
    )
    
    forces.value = [sampleForce]
    customHeroTraits.value = []
    customUnitTraits.value = []
    
    saveToStorage()
  }
  
  // Initialize store on creation
  loadFromStorage()
  
  return {
    // State
    forces,
    customHeroTraits,
    customUnitTraits,
    currentForce,
    
    // Getters
    totalForces,
    getForceById,
    getAllHeroTraits,
    getAllUnitTraits,
    
    // Actions
    loadFromStorage,
    saveToStorage,
    addForce,
    updateForce,
    deleteForce,
    duplicateForce,
    setCurrentForce,
    addCustomHeroTrait,
    addCustomUnitTrait,
    removeCustomHeroTrait,
    removeCustomUnitTrait
  }
})