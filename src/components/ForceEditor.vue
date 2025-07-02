<template>
  <main ref="container">
    <div
      v-if="isHeaderBackgroundVisible"
      class="header-bg"
      :style="`opacity: ${headerBackgroundOpacity}%;`"
    ></div>
    <force-block :is-fixed="true">
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
          <label class="checkbox"
            ><input type="checkbox" v-model="force.useContingents" />
            <span>Use contingents</span></label
          >
          <ThemePicker :theme="force.theme" @changed="themeChanged"></ThemePicker>
          <div class="actions">
            <button @click="saveForce">Save</button>
            <button class="danger" @click="cancel">Discard changes</button>
          </div>
        </div>
      </div>
    </force-block>
    <div
      v-if="force.useContingents"
      style="
        z-index: 100;
        position: fixed;
        top: 24rem;
        left: 0;
        right: 0;
        padding: 1rem;
        border-top: solid 1px var(--color-brown-dark);
        border-bottom: solid 1px var(--color-brown-dark);
        background-color: var(--color-brown-light);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 0.3rem #0006;
      "
    >
      <!-- <h2>Contingents point allocation</h2> -->
      <contingent-distribution :force="force"></contingent-distribution>
    </div>

    <div class="hero-block force-name-block" :class="{ 'use-contingents': force.useContingents }">
      <div class="form-row">
        <div class="label">Force Name:</div>
        <div class="field"><input type="text" v-model="force.name" /></div>
      </div>
    </div>

    <div class="separator">
      <Separator></Separator>
    </div>
    <h1>Heroes</h1>
    <div v-for="hero in force?.heroes" :key="hero.name">
      <div class="hero-block">
        <HeroView :hero="hero" :is-editing="true" />
        <HeroEditor
          :hero="hero"
          :force="force"
          @changed="(updatedHero) => updateHero(hero, updatedHero)"
          @deleted="() => deleteHero(hero)"
        >
        </HeroEditor>
      </div>
    </div>
    <div class="actions"><button @click="addHero">+ Add Hero</button></div>
    <div class="separator">
      <Separator></Separator>
    </div>
    <h1>Units</h1>
    <div class="hero-block" v-for="unit in force?.units" :key="unit.name">
      <UnitView :unit="unit" :is-editing="false" />
      <UnitEditor
        :unit="unit"
        :force="force"
        @changed="(updatedUnit) => updateUnit(unit, updatedUnit)"
        @deleted="() => deleteUnit(unit)"
        @duplicated="() => duplicateUnit(unit)"
      >
      </UnitEditor>
    </div>
    <div class="actions"><button @click="addUnit">+ Add Unit</button></div>
    <div class="separator" style="margin-bottom: 10rem">
      <Separator></Separator>
    </div>

    <div
      class="validation-errors"
      v-if="didAttemptToSave && !didDismissErrors && force.validationErrors.length > 0"
    >
      <ul>
        <li :key="error" v-for="error in force.validationErrors">{{ error }}</li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import Force from '@/models/Force'
import Hero from '@/models/Hero'
import { HeroStatuses } from '@/models/HeroStatuses'
import Unit from '@/models/Unit'
import UnitProfiles from '@/models/UnitProfiles'
import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'
import HeroView from '@/components/HeroView.vue'
import UnitView from '@/components/UnitView.vue'
import HeroEditor from '@/components/HeroEditor.vue'
import UnitEditor from '@/components/UnitEditor.vue'
import Separator from '@/components/SeparatorBar.vue'
import { useRoute, useRouter } from 'vue-router'
import { loadForces, saveForces } from '@/models/Forces'
import ThemePicker from './ThemePicker.vue'
import { applyTheme, ITheme } from '@/models/Themes'
import ForceBlock from './ForceBlock.vue'
import ContingentDistribution from './ContingentDistribution.vue'

const props = defineProps({
  forceProp: Force,
})

const emits = defineEmits(['changed'])

const isHeaderBackgroundVisible = ref(false)
const didAttemptToSave = ref(false)
const didDismissErrors = ref(false)
const headerBackgroundOpacity = ref(0)
const force: Ref<Force> = ref(new Force(''))
const route = useRoute()
const router = useRouter()
const container = ref(null)

function saveForce() {
  didDismissErrors.value = false
  didAttemptToSave.value = true
  if (force.value.validationErrors.length > 0) {
    return
  }
  const { forces, customHeroTraits, customUnitTraits } = loadForces()
  const existingForce = forces.find((x) => x.id === force.value.id)
  if (existingForce) {
    const index = forces.indexOf(existingForce)
    forces.splice(index, 1, force.value)
  } else {
    forces.push(force.value)
  }
  saveForces({ forces, customHeroTraits, customUnitTraits })
  router.push({ name: 'force-details', params: { id: force.value.id } })
}

function cancel() {
  if (route.params.id === 'new') {
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'force-details', params: { id: route.params.id } })
  }
}

function themeChanged(theme: ITheme) {
  force.value.theme = theme.name
  applyTheme(container.value as HTMLElement, theme)
}

function addHero() {
  force.value.heroes.push(
    new Hero(
      `Hero ${force.value.heroes.length + 1}`,
      HeroStatuses.MajorHero,
      [],
      undefined,
      0,
      undefined,
    ),
  )
}

function updateHero(hero: Hero, updatedHero: Hero) {
  if (updatedHero == null) return
  const index = force.value.heroes.indexOf(hero)
  force.value.heroes.splice(index, 1, updatedHero)
}

function deleteHero(hero: Hero) {
  const index = force.value.heroes.indexOf(hero)
  force.value.heroes.splice(index, 1)
}

function addUnit() {
  force.value.units.push(
    new Unit(`Unit ${force.value.units.length + 1}`, 1, UnitProfiles.WarriorsHeavyInfantry, [], []),
  )
}

function updateUnit(unit: Unit, updatedUnit: Unit) {
  if (updatedUnit == null) return
  const index = force.value.units.indexOf(unit)
  force.value.units.splice(index, 1, updatedUnit)
}

function deleteUnit(unit: Unit) {
  const index = force.value.units.indexOf(unit)
  force.value.units.splice(index, 1)
}

function duplicateUnit(unit: Unit) {
  force.value.units.push(Unit.fromApi(unit.toApi()))
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, 100)
}

function onScroll(e: Event | { target: { scrollTop: number } }) {
  const target = e.target as HTMLElement | { scrollTop: number }
  const scrollTop = 'scrollTop' in target ? target.scrollTop : 0
  isHeaderBackgroundVisible.value = scrollTop > 1
  headerBackgroundOpacity.value = scrollTop
}

function updateForce() {
  force.value = props.forceProp
}

watch(
  () => props.forceProp,
  () => {
    updateForce()
  },
)

watch(
  () => force.value,
  () => {
    emits('changed', force.value)
  },
)

onMounted(() => {
  window.addEventListener('scroll', () => {
    onScroll({ target: { scrollTop: window.scrollY } })
  })

  const interval = setInterval(() => {
    if (container.value != null) {
      applyTheme(container.value as HTMLElement, force.value.themeColor)
      clearInterval(interval)
    }
  }, 20)

  updateForce()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {
    onScroll({ target: { scrollTop: window.scrollY } })
  })
})
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;

  .header-bg {
    background-color: var(--color-brown-dark);
    box-shadow: 0 1rem 2rem #0006;
    height: 20rem;
    position: fixed;
    top: 4.4rem;
    right: 0;
    left: 0;
    z-index: 1;
    border-bottom: 2px solid #4e412a;
  }

  > h1 {
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 4rem;
  }
}

.force-name-block {
  margin-top: 19rem;

  &.use-contingents {
    margin-top: 28rem;
  }
}

.hero-block {
  padding: 1.6rem;
  border-radius: 0.6rem;
  border: solid 2px #4e412a;
  background-color: #fdfdfd;
  /* border: solid 1px var(--color-grey-light); */
  margin-bottom: 2rem;
  box-shadow: 0 0.3rem 1rem #0003;
}

.separator {
  margin: 2rem 0;
}

.validation-errors {
  z-index: 1000;
  background-color: #f00;
  border: solid 2px #fff;
  color: #fff;
  padding: 1rem;
  border-radius: 0.6rem;
  margin-top: 1rem;
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  left: 1rem;
  font-weight: bold;
  font-family: var(--font-form);
  box-shadow: 0 0 3rem #f00c;
}
</style>
