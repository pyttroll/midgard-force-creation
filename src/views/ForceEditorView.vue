<template>
  <main>
    <ForceEditor v-if="force" :forceProp="force" />
  </main>
</template>
<script setup lang="ts">
import { loadForces } from '@/models/Forces'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ForceEditor from '@/components/ForceEditor.vue'
import Force from '@/models/Force'
import Hero from '@/models/Hero'
import { HeroStatuses } from '@/models/HeroStatuses'
import UnitProfiles from '@/models/UnitProfiles'
import Unit from '@/models/Unit'
const route = useRoute()
const force = ref(null)
onBeforeMount(() => {
  const forceID = route.params.id
  if (forceID === 'new') {
    force.value = new Force(
      null,
      'Your force',
      [new Hero('Hero 1', HeroStatuses.MajorHero, [], null, 0, [])],
      [new Unit('Unit 1', 1, UnitProfiles.WarriorsHeavyInfantry, [], [])],
    )
  } else {
    const { forces } = loadForces()
    force.value = forces.find((x) => x.id === forceID)
  }
})
</script>
<style lang="scss" scoped>
main {
  padding-top: 0.5rem;
}
</style>
