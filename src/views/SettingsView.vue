<template>
  <main>
    <p>
      Your force data lives in this browser's local storage, you can use the backup and restore
      functionality to share the data accross browsers and computers.
    </p>
    <h2>Backup your data</h2>
    <button @click="backupForces">Download your forces</button>

    <div class="separator">
      <SeparatorBar></SeparatorBar>
    </div>

    <h2>Restore your data</h2>
    <input type="file" accept="application/json" @change="importData" />

    <div class="separator">
      <SeparatorBar></SeparatorBar>
    </div>
    <h2>Custom Hero Traits</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Points Cost</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="customHeroTraits.length === 0">
          <td colspan="4" class="no-custom-traits"><i>No custom traits</i></td>
        </tr>
        <tr class="custom-trait" v-for="trait in customHeroTraits" :key="trait.name">
          <td>{{ trait.name }}</td>
          <td>{{ trait.pointCost }}</td>
          <td>{{ trait.description }}</td>
          <td>
            <button class="danger" @click="() => deleteCustomHeroTrait(trait)">Delete</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="section">
          <td colspan="4"><b>Add a new custom hero trait:</b></td>
        </tr>
        <tr>
          <td><input type="text" placeholder="name" v-model="customHeroTraitName" /></td>
          <td>
            <input type="number" placeholder="point cost" v-model="customHeroTraitPointCost" />
          </td>
          <td>
            <input type="text" placeholder="description" v-model="customHeroTraitDescription" />
          </td>
          <td><button @click="addCustomHeroTrait">Add</button></td>
        </tr>
      </tfoot>
    </table>

    <div class="separator">
      <SeparatorBar></SeparatorBar>
    </div>
    <h2>Custom Unit Traits</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Points Cost</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="customUnitTraits.length === 0">
          <td colspan="4" class="no-custom-traits"><i>No custom traits</i></td>
        </tr>
        <tr class="custom-trait" v-for="trait in customUnitTraits" :key="trait.name">
          <td>{{ trait.name }}</td>
          <td>{{ trait.pointCost[0] }}</td>
          <td>{{ trait.description }}</td>
          <td>
            <button class="danger" @click="() => deleteCustomUnitTrait(trait)">Delete</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="section">
          <td colspan="4"><b>Add a new custom unit trait:</b></td>
        </tr>
        <tr>
          <td><input type="text" placeholder="name" v-model="customUnitTraitName" /></td>
          <td>
            <input type="number" placeholder="point cost" v-model="customUnitTraitPointCost" />
          </td>
          <td>
            <input type="text" placeholder="description" v-model="customUnitTraitDescription" />
          </td>
          <td><button @click="addCustomUnitTrait">Add</button></td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>

<script setup lang="ts">
import SeparatorBar from '@/components/SeparatorBar.vue'
import { loadForces, saveForces } from '@/models/Forces'
import HeroTrait from '@/models/HeroTrait'
import UnitTrait from '@/models/UnitTrait'
import { onMounted, Ref, ref } from 'vue'

const customHeroTraits: Ref<Array<HeroTrait>> = ref([])
const customUnitTraits: Ref<Array<UnitTrait>> = ref([])
const customHeroTraitName = ref('')
const customHeroTraitPointCost = ref()
const customHeroTraitDescription = ref('')
const customUnitTraitName = ref('')
const customUnitTraitPointCost = ref()
const customUnitTraitDescription = ref('')

onMounted(() => {
  const { customHeroTraits: heroTraits, customUnitTraits: unitTraits } = loadForces()
  customHeroTraits.value = heroTraits
  customUnitTraits.value = unitTraits
})

function backupForces() {
  const { forces, customHeroTraits, customUnitTraits } = loadForces()
  const json = JSON.stringify(
    {
      forces: forces.map((x) => x.toApi()),
      customHeroTraits: customHeroTraits.map((x) => x.toApi()),
      customUnitTraits: customUnitTraits.map((x) => x.toApi()),
    },
    null,
    2,
  )
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'forces.json'
  a.click()
}

function importData() {
  const file = (event.target as HTMLInputElement).files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const json = reader.result as string
    // const forces = JSON.parse(json).map((x) => Force.fromApi(x))
    localStorage.setItem('forces', json)
    alert('Data imported')
  }
  reader.readAsText(file)
}

function addCustomHeroTrait() {
  customHeroTraits.value.push(
    HeroTrait.fromObject({
      name: customHeroTraitName.value,
      pointCost: customHeroTraitPointCost.value,
      description: customHeroTraitDescription.value,
      isRareAndPowerful: false,
      isCustom: true,
    }),
  )
  const { forces } = loadForces()
  saveForces({
    forces,
    customHeroTraits: customHeroTraits.value,
    customUnitTraits: customUnitTraits.value,
  })
  customHeroTraitName.value = ''
  customHeroTraitPointCost.value = null
  customHeroTraitDescription.value = ''
}

function deleteCustomHeroTrait(trait: HeroTrait) {
  const index = customHeroTraits.value.indexOf(trait)
  customHeroTraits.value.splice(index, 1)
  const { forces } = loadForces()
  saveForces({
    forces,
    customHeroTraits: customHeroTraits.value,
    customUnitTraits: customUnitTraits.value,
  })
}

function addCustomUnitTrait() {
  customUnitTraits.value.push(
    UnitTrait.fromObject({
      name: customUnitTraitName.value,
      pointCost: [customUnitTraitPointCost.value],
      description: customUnitTraitDescription.value,
      isCustom: true,
    }),
  )
  const { forces } = loadForces()
  saveForces({
    forces,
    customHeroTraits: customHeroTraits.value,
    customUnitTraits: customUnitTraits.value,
  })
  customUnitTraitName.value = ''
  customUnitTraitPointCost.value = null
  customUnitTraitDescription.value = ''
}

function deleteCustomUnitTrait(trait: UnitTrait) {
  const index = customUnitTraits.value.indexOf(trait)
  customUnitTraits.value.splice(index, 1)
  const { forces } = loadForces()
  saveForces({
    forces,
    customHeroTraits: customHeroTraits.value,
    customUnitTraits: customUnitTraits.value,
  })
}
</script>

<style lang="scss" scoped>
main {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
}
.separator {
  margin: 2rem 0;
}

.no-custom-traits {
  text-align: center;
  padding: 1rem;
}
</style>
