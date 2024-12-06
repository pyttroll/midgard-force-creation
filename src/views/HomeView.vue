<template>
  <main>
    <ForceEditor :forceProp="force" />
  </main>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import ForceEditor from '@/components/ForceEditor.vue'
import Force from '@/models/Force'

const force: Ref<Force> = ref(null)
</script>

<style scoped></style>
