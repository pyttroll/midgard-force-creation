<template>
  <div class="force" ref="container">
    <force-block>
      <h1 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
        {{ force.name }}
      </h1>
      <h2>Total Points {{ force.points }}</h2>
      <b>Hero Points {{ force.heroesPoints }}</b
      ><br />
      <b>Unit Points {{ force.unitsPoints }}</b
      ><br />
      <b>Reputation {{ force.reputation }}</b
      ><br />
      <b>Reputation Tokens {{ force.reputationTokens }}</b>
    </force-block>
  </div>
</template>

<script setup lang="ts">
import Force from '@/models/Force'
import { applyTheme } from '@/models/Themes'
import { onMounted, ref } from 'vue'
import ForceBlock from './ForceBlock.vue'

const props = defineProps({
  force: Force,
})

const container = ref(null)

onMounted(() => {
  const interval = setInterval(() => {
    if (container.value != null) {
      applyTheme(container.value as HTMLElement, props.force.themeColor)
      clearInterval(interval)
    }
  }, 20)
})
</script>

<style lang="scss" scoped>
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
}
</style>
