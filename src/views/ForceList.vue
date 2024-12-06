<template>
  <main>
    <div class="actions">
      <button @click="print">Print</button>
    </div>
    <ForceListItem
      v-for="force in forces"
      :key="force.name"
      :force="force"
      @click="() => viewForce(force)"
    >
    </ForceListItem>

    <div class="force" @click="createNewForce">
      <div class="well new-force">Create a new Force</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Force from '@/models/Force'
import { loadForces } from '@/models/Forces'
import { onBeforeMount, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import ForceListItem from '@/components/ForceListItem.vue'

const forces: Ref<Array<Force>> = ref([])
const router = useRouter()

function viewForce(force: Force) {
  router.push({ name: 'force-details', params: { id: force.id } })
}
function createNewForce() {
  router.push({ name: 'force-editor', params: { id: 'new' } })
}

function print() {
  router.push({ name: 'printable-force-list' })
}

onBeforeMount(() => {
  forces.value = loadForces().forces
})
</script>

<style lang="scss" scoped>
main {
  padding: 1.6rem;

  .actions {
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .force {
    margin: 1.6rem;
    cursor: pointer;
    width: calc(100vw - 6.4rem);
    .well {
      &:hover {
        background-color: var(--color-brown-lighter);
        background: linear-gradient(
          to top left,
          var(--color-brown-lighter),
          95%,
          var(--color-brown-super-light)
        );
      }

      &.new-force {
        display: flex;
        align-items: center;
        justify-content: center;
        border-style: dashed;
        font-size: 2rem;
        font-family: var(--font-form);
        background-color: transparent;
        background: none;

        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
