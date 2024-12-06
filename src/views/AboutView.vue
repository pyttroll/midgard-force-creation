<template>
  <main>
    <h1>Midgard Rulebook</h1>
    <a href="https://toofatlardies.co.uk/product/midgard-heroic-battles/" target="_blank"
      >https://toofatlardies.co.uk/product/midgard-heroic-battles/</a
    >
    <div class="separator">
      <SeparatorBar></SeparatorBar>
    </div>
    <h1>Feedback</h1>
    <p>
      You can drop me an email at
      <a href="mailto:iwouldlike2rage@gmail.com">iwouldlike2rage@gmail.com</a>
    </p>
  </main>
</template>

<script setup lang="ts">
import SeparatorBar from '@/components/SeparatorBar.vue'
</script>

<style lang="scss" scoped>
main {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.separator {
  margin: 2rem 0;
}
</style>
