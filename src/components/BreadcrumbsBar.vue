<template>
  <div class="breadcrumbs">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.route">
      <span v-if="breadcrumbs.indexOf(breadcrumb) > 0">&gt;</span>
      <div class="breadcrumb">
        <router-link :to="breadcrumb.route">{{ breadcrumb.label }}</router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from '@/models/Breadcrumb'

defineProps({
  breadcrumbs: Array<Breadcrumb>,
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.2rem;

  .breadcrumb {
    margin-right: 0.5rem;
  }

  span {
    margin-right: 0.5rem;
  }
}
</style>
