<template>
  <main>
    <div class="actions">
      <button @click="close">Close</button>
    </div>
    <div v-for="force in forces" :key="force.name" class="force">
      <ForceView :force="force" :show-actions="false" />
    </div>
  </main>
</template>

<script setup lang="ts">
import ForceView from '@/components/ForceView.vue'
import Force from '@/models/Force'
import { loadForces } from '@/models/Forces'
import { onBeforeMount, onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

const forces: Ref<Array<Force>> = ref([])
const router = useRouter()

function close() {
  router.push({ name: 'home' })
}

onBeforeMount(() => {
  forces.value = loadForces().forces
})

onMounted(() => {
  window.onafterprint = close

  setTimeout(() => window.print(), 200)
})
</script>

<style lang="scss" scoped>
main {
  padding: 0;

  .actions {
    padding: 1.6rem 1.6rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .force {
    page-break-after: always;
    &:last-of-type {
      page-break-after: auto;
    }
  }
}

@media print {
  main {
    .actions {
      display: none;
    }
  }
}
</style>
