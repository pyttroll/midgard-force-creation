<template>
  <main>
    <div v-if="!editorStore.isEditing" class="force-selector">
      <h2>Select a Force to Edit</h2>
      <div v-if="forcesStore.forces.length === 0" class="no-forces">
        <p>No forces available. Create a new force to get started.</p>
        <button @click="createNewForce">Create New Force</button>
      </div>
      <div v-else class="forces-list">
        <div 
          v-for="force in forcesStore.forces" 
          :key="force.id"
          class="force-item"
          @click="selectForce(force)"
        >
          <h3>{{ force.name }}</h3>
          <p>{{ force.points }} points</p>
          <p>{{ force.units.length }} units, {{ force.heroes.length }} heroes</p>
        </div>
      </div>
    </div>
    
    <div v-else class="editor-container">
      <div class="editor-toolbar">
        <button @click="editorStore.undo" :disabled="!editorStore.canUndo">Undo</button>
        <button @click="editorStore.redo" :disabled="!editorStore.canRedo">Redo</button>
        <button @click="saveCurrentForce" :disabled="!editorStore.hasUnsavedChanges">Save</button>
        <button @click="closeEditor">Close</button>
      </div>
      <ForceEditor :forceProp="editorStore.currentForce" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ForceEditor from '@/components/ForceEditor.vue'
import { useForcesStore } from '@/stores/forces'
import { useEditorStore } from '@/stores/editor'
import Force from '@/models/Force'

const forcesStore = useForcesStore()
const editorStore = useEditorStore()

function selectForce(force: Force) {
  editorStore.setCurrentForce(force)
}

function createNewForce() {
  const newForce = new Force(
    crypto.randomUUID(),
    'New Force',
    [],
    [],
    '#1f2937'
  )
  forcesStore.addForce(newForce)
  editorStore.setCurrentForce(newForce)
}

function saveCurrentForce() {
  if (editorStore.currentForce) {
    forcesStore.updateForce(editorStore.currentForce)
    editorStore.markAsSaved()
  }
}

function closeEditor() {
  if (editorStore.hasUnsavedChanges) {
    if (confirm('You have unsaved changes. Are you sure you want to close?')) {
      editorStore.setCurrentForce(null)
    }
  } else {
    editorStore.setCurrentForce(null)
  }
}
</script>

<style scoped>
.force-selector {
  padding: 20px;
}

.no-forces {
  text-align: center;
  padding: 40px;
}

.forces-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.force-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.force-item:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.force-item h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.force-item p {
  margin: 5px 0;
  color: #666;
}

.editor-toolbar {
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.editor-toolbar button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.editor-toolbar button:hover:not(:disabled) {
  background: #e9ecef;
}

.editor-toolbar button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
