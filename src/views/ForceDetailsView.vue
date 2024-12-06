<template>
  <main>
    <ForceView v-if="force" :force="force" :show-actions="true" />
  </main>
</template>
<script setup lang="ts">
import { loadForces } from '@/models/Forces'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ForceView from '@/components/ForceView.vue'
const route = useRoute()
const force = ref(null)
onBeforeMount(() => {
  const forceID = route.params.id
  const { forces } = loadForces()
  force.value = forces.find((x) => x.id === forceID)
})
</script>
<style lang="scss" scoped>
main {
  padding-top: 1rem;
}
</style>
