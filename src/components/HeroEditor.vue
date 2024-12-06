<template>
  <div class="form-row">
    <div class="label">Name:</div>
    <div class="field">
      <input type="text" v-model="name" @blur="changed" @keypress="onKeyPressed" />
    </div>
  </div>
  <div class="form-row">
    <div class="label">Status:</div>
    <div class="field">
      <multiselect
        type="text"
        v-model="status"
        :options="Object.values(HeroStatuses)"
        :allow-empty="false"
        label="formattedName"
        :show-labels="false"
      >
        <template #option="props">
          <div class="option__desc" style="display: flex">
            <span class="option__title" style="flex-basis: 100%">{{ props.option.name }}</span
            >&nbsp;
            <span class="option__small badge" style="flex-basis: 5rem; flex-shrink: 0"
              >Level {{ props.option.level }}
            </span>
          </div>
        </template>
      </multiselect>
    </div>
  </div>
  <div class="form-row align-top">
    <div class="label">Traits:</div>
    <div class="field">
      <multiselect
        type="text"
        v-model="traits"
        :options="heroTraits"
        :allow-empty="true"
        label="shortName"
        :show-labels="false"
        :multiple="true"
        track-by="name"
        :close-on-select="false"
        :max="5"
        ><template #option="props">
          <div class="option__desc" style="display: flex">
            <span class="option__title" style="flex-basis: 100%">{{ props.option.shortName }}</span
            >&nbsp;
            <span
              v-if="props.option.pointCost !== 0"
              class="option__small badge"
              style="flex-basis: 5rem; flex-shrink: 0"
              >{{
                props.option.pointCost.length > 1
                  ? props.option.pointCost[hero.status.level - 1]
                  : props.option.pointCost || '–'
              }}
              pts</span
            >
            <span v-else class="option__small badge" style="flex-basis: 5rem; flex-shrink: 0"
              >Free
            </span>
          </div>
        </template></multiselect
      >
    </div>
  </div>
  <div class="form-row align-top" v-if="traits.some((x) => x.name === 'Sorcery')">
    <div class="label">Spells:</div>
    <div class="field">
      <multiselect
        type="text"
        v-model="spells"
        :options="Object.values(Spells)"
        :allow-empty="true"
        label="name"
        :show-labels="false"
        :multiple="true"
        track-by="name"
        :close-on-select="false"
        :max="hero.status.level"
        ><template #option="props">
          <div class="option__desc" style="display: flex">
            <span class="option__title" style="flex-basis: 100%">{{ props.option.name }}</span
            >&nbsp;<span class="option__small badge" style="flex-basis: 5rem; flex-shrink: 0"
              >{{ props.option.pointCost }} pts</span
            >
          </div>
        </template></multiselect
      >
    </div>
  </div>
  <div class="form-row">
    <div class="label">Missiles:</div>
    <div class="field">
      <multiselect
        type="text"
        v-model="missileType"
        :options="HeroMissileTypes"
        :allow-empty="false"
        label="name"
        :show-labels="false"
      />
    </div>
  </div>
  <div class="form-row">
    <div class="label">Armour:</div>
    <div class="field">
      <label>
        <input type="checkbox" v-model="armourModifierDecrease" /><span
          >Reduce Armour to 2</span
        ></label
      >
      <label
        ><input type="checkbox" v-model="armourModifierIncrease" /><span
          >Increase Armour to 4</span
        ></label
      >
    </div>
  </div>
  <div class="form-row">
    <div class="actions"><button class="danger" @click="deleted">Delete</button></div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import Hero from '@/models/Hero'
import { HeroStatuses, IHeroStatus } from '@/models/HeroStatuses'
import HeroTrait, { getHeroTraits } from '@/models/HeroTrait'
import { IMissileType } from '@/models/Missiles'
import { computed, onMounted, ref, Ref, watch } from 'vue'
import { HeroMissileTypes } from '@/models/Missiles'
import Spell, { Spells } from '@/models/Spell'

const props = defineProps({
  hero: Hero,
})

const emit = defineEmits(['changed', 'deleted'])

const name = ref('')
const status: Ref<IHeroStatus> = ref(HeroStatuses[0])
const traits: Ref<HeroTrait[]> = ref([])
const spells: Ref<Spell[]> = ref([])
const missileType: Ref<IMissileType> = ref(null)
const armourModifierDecrease = ref(false)
const armourModifierIncrease = ref(false)

const heroTraits = computed(() => {
  return getHeroTraits()
})

function updateRefs() {
  name.value = props.hero.name
  status.value = props.hero.status
  traits.value = props.hero.traits
  spells.value = props.hero.spells
  missileType.value = props.hero.missileType
  armourModifierDecrease.value = props.hero.armourModifierDecrease
  armourModifierIncrease.value = props.hero.armourModifierIncrease
}

function deleted() {
  emit('deleted')
}

const updatedHero = computed(() => {
  return new Hero(
    name.value,
    status.value,
    traits.value,
    missileType.value,
    armourModifierDecrease.value ? -1 : armourModifierIncrease.value ? 1 : 0,
    spells.value,
  )
})

function changed() {
  emit('changed', updatedHero.value)
}

function onKeyPressed(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    changed()
  }
}

watch(
  () => props.hero,
  () => {
    updateRefs()
  },
)

watch(
  () => status.value,
  () => {
    changed()
  },
)
watch(
  () => traits.value,
  () => {
    if (spells.value?.length > 0 && traits.value.some((x) => x.name !== 'Sorcery')) {
      spells.value = []
    }
    changed()
  },
)
watch(
  () => spells.value,
  () => {
    changed()
  },
)
watch(
  () => missileType.value,
  () => {
    changed()
  },
)
watch(
  () => armourModifierDecrease.value,
  (val) => {
    if (val && armourModifierIncrease.value) {
      armourModifierIncrease.value = false
    }
    changed()
  },
)
watch(
  () => armourModifierIncrease.value,
  (val) => {
    if (val && armourModifierDecrease.value) {
      armourModifierDecrease.value = false
    }
    changed()
  },
)

onMounted(() => {
  updateRefs()
})
</script>
