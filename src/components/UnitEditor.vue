<template>
  <hr />
  <div class="form-row">
    <div class="label">Name:</div>
    <div class="field">
      <input type="text" v-model="name" @blur="changed" @keypress="onKeyPressed" />
    </div>
  </div>
  <div class="form-row">
    <div class="label">Quantity:</div>
    <div class="field">
      <input type="number" v-model="qty" @blur="changed" @keypress="onKeyPressed" />
    </div>
  </div>
  <div class="form-row">
    <div class="label">Profile:</div>
    <div class="field">
      <multiselect
        type="text"
        v-model="profile"
        :options="Object.values(UnitProfiles)"
        :allow-empty="false"
        label="formattedName"
        :show-labels="false"
      ></multiselect>
    </div>
  </div>
  <div class="form-row align-top">
    <div class="label">Traits:</div>
    <div class="field">
      <multiselect
        type="text"
        v-model="traits"
        :options="availableTraits"
        :allow-empty="true"
        label="shortName"
        :show-labels="false"
        :multiple="true"
        track-by="name"
        :close-on-select="false"
        :max="profile.traitsLimit - (unit.builtInTraits?.length || 0)"
        ><template #option="props">
          <div class="option__desc" style="display: flex">
            <span class="option__title" style="flex-basis: 100%">{{ props.option.shortName }}</span
            >&nbsp;
            <span
              v-if="props.option.pointCost && props.option.pointCost.length > 0"
              class="option__small badge"
              style="flex-basis: 5rem; flex-shrink: 0"
              >{{ props.option.pointCost[0] }} pts</span
            >
          </div>
        </template></multiselect
      >
    </div>
  </div>
  <div class="form-row align-top">
    <div class="label">Options:</div>
    <div class="field">
      <ul class="options">
        <li v-for="option in profile.options" :key="option.id">
          <label
            ><input
              type="checkbox"
              :checked="options?.find((o) => o.id === option.id) != null"
              :value="option.id"
              @click="() => onOptionClicked(option.id)"
            /><span>{{ option.name }} {{}}</span>
            <span class="badge small" style="margin-left: 0.6rem"
              >{{ option.points }} pts</span
            ></label
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="form-row" v-if="force.useContingents">
    <div class="label">Contingent:</div>
    <div class="field">
      <contingent-selector
        :name="unit.name"
        :qty="unit.qty"
        :contingent="contingent"
        @changed="onContingentChanged"
      ></contingent-selector>
      <!-- <multiselect
        type="text"
        v-model="contingent"
        :options="contingentOptions"
        :allow-empty="false"
        :show-labels="false"
      /> -->
    </div>
  </div>
  <div class="form-row">
    <div class="actions">
      <button class="default" @click="duplicated">Duplicate</button>&nbsp;<button
        class="danger"
        @click="deleted"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import Unit from '@/models/Unit'
import UnitTrait, { getUnitTraits } from '@/models/UnitTrait'
import { computed, onMounted, ref, Ref, watch } from 'vue'
import UnitProfile, { IUnitOption } from '@/models/UnitProfile'
import UnitProfiles from '@/models/UnitProfiles'
import Force from '@/models/Force'
import ContingentSelector from './ContingentSelector.vue'
import { IContingentAllocation } from '@/models/Contingent'

const props = defineProps({
  unit: Unit,
  force: Force,
})

const emit = defineEmits(['changed', 'deleted', 'duplicated'])

const name = ref('')
const qty = ref(1)
const profile: Ref<UnitProfile> = ref(UnitProfiles.WarriorsHeavyInfantry)
const traits: Ref<UnitTrait[]> = ref([])
const options: Ref<Array<IUnitOption>> = ref(null)
const contingent: Ref<Array<IContingentAllocation>> = ref([])

const availableTraits = computed(() => {
  const allTraits = getUnitTraits()
  return [
    ...profile.value.availableTraits.map((x) => x.trait),
    ...allTraits.filter((x) => x.isCustom),
  ].sort((a, b) => a.name.localeCompare(b.name))
})

function updateRefs() {
  name.value = props.unit.name
  qty.value = props.unit.qty
  profile.value = props.unit.profile
  traits.value = props.unit.traits
  options.value = props.unit.options
  contingent.value = props.unit.contingent || []
}

function deleted() {
  emit('deleted')
}

function duplicated() {
  emit('duplicated')
}

const updatedUnit = computed(() => {
  return new Unit(
    name.value,
    qty.value,
    profile.value,
    traits.value,
    options.value,
    contingent.value,
  )
})

function changed() {
  emit('changed', updatedUnit.value)
}

function onKeyPressed(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    changed()
  }
}

function onOptionClicked(id: number) {
  const option = profile.value.options.find((x) => x.id === id)
  if (option) {
    if (options.value.includes(option)) {
      options.value = options.value.filter((x) => x !== option)
    } else {
      options.value.push(option)
    }
  }
}

function onContingentChanged(change: Array<IContingentAllocation>) {
  console.log(change)
}

watch(
  () => props.unit,
  () => {
    updateRefs()
  },
)

watch(
  () => profile.value,
  () => {
    changed()
  },
)
watch(
  () => traits.value,
  () => {
    changed()
  },
)
watch(
  () => options.value,
  () => {
    changed()
  },
)
watch(
  () => contingent.value,
  () => {
    changed()
  },
)

onMounted(() => {
  updateRefs()
})
</script>
