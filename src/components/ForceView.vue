<template>
  <div class="force-view" ref="container">
    <div class="well-container">
      <div class="well-bg"></div>
      <div class="well">
        <h1 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
          {{ force.name }}
        </h1>
        <div class="columns">
          <div class="column-left">
            <h2>Total Points {{ force.points }}</h2>
            <b>Hero Points {{ force.heroesPoints }}</b>
            <b>Unit Points {{ force.unitsPoints }}</b>
            <b>Reputation {{ force.reputation }}</b>
            <b>Reputation Tokens {{ force.reputationTokens }}</b>
          </div>
          <div class="column-right">
            <div v-if="force.useContingents" class="badge">Using contingents</div>
            <div class="actions" v-if="showActions">
              <button @click="editForce">Edit</button>
              <button @click="printForce">Print</button>
              <button @click="duplicateForce">Copy</button>
              <button @click="deleteForce" class="danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="force?.useContingents">
      <template v-for="contingent in force.contingents" :key="contingent">
        <h2>Contingent {{ contingent.name }}</h2>
        <div class="hero-block" v-for="hero in contingent.heroes" :key="hero.name">
          <HeroView :hero="hero" :is-editing="false" />
        </div>
        <div class="unit-block" v-for="unit in contingent.units" :key="unit.name">
          <UnitView :unit="unit" :is-editing="false" />
        </div>
      </template>
    </div>
    <template v-else>
      <div class="heroes">
        <div class="hero-block" v-for="(hero, i) in force?.heroes" :key="hero.name">
          <h2 v-if="i === 0">Heroes</h2>
          <HeroView :hero="hero" :is-editing="false" />
        </div>
      </div>
      <div class="units">
        <div class="unit-block" v-for="(unit, i) in force?.units" :key="unit.name">
          <h2 v-if="i === 0">Units</h2>
          <UnitView :unit="unit" :is-editing="false" />
        </div>
      </div>
    </template>
  </div>
  <div class="veil" v-if="isPromptForConfirmationModalVisible"></div>
  <div class="modal" v-if="isPromptForConfirmationModalVisible">
    <div class="modal-header">Save Changes</div>
    <div class="modal-content">
      <span>Are you sure you want to delete this force?</span>
      <div class="actions">
        <button @click="confirmDeleteForce" class="danger">Yes</button>
        <button @click="isPromptForConfirmationModalVisible = false">No</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Force from '@/models/Force'
import HeroView from '@/components/HeroView.vue'
import UnitView from '@/components/UnitView.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { loadForces, saveForces } from '@/models/Forces'
import Hero from '@/models/Hero'
import Unit from '@/models/Unit'
import { applyTheme } from '@/models/Themes'

const props = defineProps({
  force: Force,
  showActions: { type: Boolean, default: true },
})

const isPromptForConfirmationModalVisible = ref(false)
const container = ref(null)

const router = useRouter()
function editForce() {
  router.push({ name: 'force-editor', params: { id: props.force.id } })
}

function duplicateForce() {
  const newForce = new Force(
    null,
    `${props.force.name} - Copy`,
    props.force.heroes.map((x) => x.toApi()).map((x) => Hero.fromApi(x)),
    props.force.units.map((x) => x.toApi()).map((x) => Unit.fromApi(x)),
  )
  const { forces, customHeroTraits, customUnitTraits } = loadForces()
  saveForces({ forces: [...forces, newForce], customHeroTraits, customUnitTraits })
  router.push({ name: 'force-editor', params: { id: newForce.id } })
}

function deleteForce() {
  isPromptForConfirmationModalVisible.value = true
}

function confirmDeleteForce() {
  isPromptForConfirmationModalVisible.value = false
  const { forces, customHeroTraits, customUnitTraits } = loadForces()

  saveForces({
    forces: forces.filter((x) => x.id !== props.force.id),
    customHeroTraits,
    customUnitTraits,
  })
  router.push({ name: 'home' })
}

function printForce() {
  window.print()
}

onMounted(() => {
  const interval = setInterval(() => {
    if (container.value != null) {
      applyTheme(container.value as HTMLElement, props.force.themeColor)
      clearInterval(interval)
    }
  }, 20)
})
</script>

<style scoped>
.force-view {
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;

  .well-container {
    position: relative;
    margin-bottom: 1.6rem;
  }

  .well-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      60deg,
      var(--color-brown-lighter),
      calc(100% - 50px),
      transparent,
      calc(100% - 50px),
      transparent
    );
  }

  .well {
    position: relative;
    position: relative;
    /* background-image: url(/frame/Midgard-frame.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain; */

    background-image: url(/frames/right.png), url(/frames/left.png), url(/frames/center.png);
    background-position:
      right,
      left,
      left center;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-size:
      contain,
      contain,
      calc(100% - 50px) 100%;
  }

  > h1 {
    text-align: left;
    font-size: 1.4em;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
}

.modal {
  background-color: #fff;
  border: 2px solid var(--color-dark);
  border-radius: 0.6rem;
  position: fixed;
  width: 50vw;
  z-index: 100;
  top: 15vh;
  left: calc(50% - 25vw);
  font-family: var(--font-form);

  .modal-header {
    background-color: var(--color-brown-medium);
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 1.6rem;
  }

  .modal-content {
    padding: 2.4rem;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1.6rem;
    button {
      margin-left: 1rem;
    }
  }
}

.veil {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0002;
}

@media print {
  .force-view {
    margin: 0;
    .well {
      .actions {
        display: none;
      }
    }
  }

  .contingent-block,
  .hero-block,
  .unit-block {
    break-inside: avoid;
  }
}
</style>
