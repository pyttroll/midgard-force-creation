<template>
  <div class="theme-picker">
    <div
      v-for="t in Object.values(Themes)"
      :key="t.name"
      class="theme"
      :class="{ selected: t.name === theme }"
      @click="() => selectTheme(t)"
    >
      <div class="color theme-color" :style="`background-color: ${t.medium};`"></div>
      <div class="color theme-color-hover" :style="`background-color: ${t.lighter};`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Themes, { ITheme } from '@/models/Themes'
defineProps({
  theme: String,
})
const emit = defineEmits(['changed'])

function selectTheme(theme: ITheme) {
  emit('changed', theme)
}
</script>

<style lang="scss" scoped>
.theme-picker {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .theme {
    cursor: pointer;
    margin-left: 0.4rem;

    &.selected {
      .color {
        border-color: #fff;
        box-shadow: 0 0 0.6rem #0006;
      }
    }

    .color {
      border: solid 2px #444;
      box-shadow: 0 0 0.3rem #0006;
      border-radius: 100%;
      width: 3rem;
      height: 3rem;
    }

    .theme-color-hover {
      display: none;
    }

    &:hover {
      .theme-color {
        display: none;
      }
      .theme-color-hover {
        display: block;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .theme-picker {
    .theme {
      .color {
        height: 2rem;
        width: 2rem;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .theme-picker {
    .theme {
      .color {
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }
}
</style>
