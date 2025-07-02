import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Force from '@/models/Force'
import Hero from '@/models/Hero'
import Unit from '@/models/Unit'

export const useEditorStore = defineStore('editor', () => {
  // State
  const currentForce = ref<Force | null>(null)
  const selectedUnit = ref<Unit | null>(null)
  const selectedHero = ref<Hero | null>(null)
  const isEditing = ref(false)
  const hasUnsavedChanges = ref(false)
  
  // History for undo/redo functionality
  const history = ref<string[]>([])
  const historyIndex = ref(-1)
  const maxHistorySize = 50
  
  // Getters
  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)
  
  const currentForcePoints = computed(() => {
    return currentForce.value?.points || 0
  })
  
  const currentForceUnits = computed(() => {
    return currentForce.value?.units || []
  })
  
  const currentForceHeroes = computed(() => {
    return currentForce.value?.heroes || []
  })
  
  // Actions
  function setCurrentForce(force: Force | null) {
    if (force) {
      currentForce.value = force
      isEditing.value = true
      saveToHistory()
    } else {
      currentForce.value = null
      isEditing.value = false
      clearHistory()
    }
    selectedUnit.value = null
    selectedHero.value = null
    hasUnsavedChanges.value = false
  }
  
  function updateCurrentForce(force: Force) {
    if (currentForce.value && currentForce.value.id === force.id) {
      currentForce.value = force
      hasUnsavedChanges.value = true
      saveToHistory()
    }
  }
  
  function selectUnit(unit: Unit | null) {
    selectedUnit.value = unit
    selectedHero.value = null
  }
  
  function selectHero(hero: Hero | null) {
    selectedHero.value = hero
    selectedUnit.value = null
  }
  
  function addUnitToCurrentForce(unit: Unit) {
    if (currentForce.value) {
      currentForce.value.units.push(unit)
      hasUnsavedChanges.value = true
      saveToHistory()
    }
  }
  
  function removeUnitFromCurrentForce(unitIndex: number) {
    if (currentForce.value && currentForce.value.units[unitIndex]) {
      currentForce.value.units.splice(unitIndex, 1)
      hasUnsavedChanges.value = true
      saveToHistory()
      
      // Clear selection if removed unit was selected
      if (selectedUnit.value === currentForce.value.units[unitIndex]) {
        selectedUnit.value = null
      }
    }
  }
  
  function addHeroToCurrentForce(hero: Hero) {
    if (currentForce.value) {
      currentForce.value.heroes.push(hero)
      hasUnsavedChanges.value = true
      saveToHistory()
    }
  }
  
  function removeHeroFromCurrentForce(heroIndex: number) {
    if (currentForce.value && currentForce.value.heroes[heroIndex]) {
      currentForce.value.heroes.splice(heroIndex, 1)
      hasUnsavedChanges.value = true
      saveToHistory()
      
      // Clear selection if removed hero was selected
      if (selectedHero.value === currentForce.value.heroes[heroIndex]) {
        selectedHero.value = null
      }
    }
  }
  
  function duplicateUnit(unit: Unit) {
    if (currentForce.value) {
      const duplicated = Unit.fromApi(unit.toApi())
      currentForce.value.units.push(duplicated)
      hasUnsavedChanges.value = true
      saveToHistory()
    }
  }
  
  function saveToHistory() {
    if (!currentForce.value) return
    
    const snapshot = JSON.stringify(currentForce.value.toApi())
    
    // Remove any history after current index (if we're in the middle of history)
    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }
    
    // Add new snapshot
    history.value.push(snapshot)
    historyIndex.value = history.value.length - 1
    
    // Limit history size
    if (history.value.length > maxHistorySize) {
      history.value.shift()
      historyIndex.value--
    }
  }
  
  function undo() {
    if (canUndo.value && currentForce.value) {
      historyIndex.value--
      const snapshot = history.value[historyIndex.value]
      currentForce.value = Force.fromApi(JSON.parse(snapshot))
      hasUnsavedChanges.value = true
    }
  }
  
  function redo() {
    if (canRedo.value && currentForce.value) {
      historyIndex.value++
      const snapshot = history.value[historyIndex.value]
      currentForce.value = Force.fromApi(JSON.parse(snapshot))
      hasUnsavedChanges.value = true
    }
  }
  
  function clearHistory() {
    history.value = []
    historyIndex.value = -1
  }
  
  function markAsSaved() {
    hasUnsavedChanges.value = false
  }
  
  return {
    // State
    currentForce,
    selectedUnit,
    selectedHero,
    isEditing,
    hasUnsavedChanges,
    
    // Getters
    canUndo,
    canRedo,
    currentForcePoints,
    currentForceUnits,
    currentForceHeroes,
    
    // Actions
    setCurrentForce,
    updateCurrentForce,
    selectUnit,
    selectHero,
    addUnitToCurrentForce,
    removeUnitFromCurrentForce,
    addHeroToCurrentForce,
    removeHeroFromCurrentForce,
    duplicateUnit,
    undo,
    redo,
    markAsSaved
  }
})