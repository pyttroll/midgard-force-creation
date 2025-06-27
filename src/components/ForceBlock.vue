<template>
  <div class="well-container" :class="isFixed ? 'fixed' : undefined">
    <div class="well-bg"></div>
    <div class="well">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  isFixed?: boolean
}

withDefaults(defineProps<IProps>(), { isFixed: false })
</script>

<style lang="scss" scoped>
.well-container {
  position: relative;
  margin-bottom: 1.6rem;

  &.fixed {
    position: fixed;
    top: 6rem;
    width: calc(100% - 4rem);
    z-index: 1;
  }
}

.well-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    60deg,
    var(--color-brown-lighter),
    calc(100% - 50px),
    transparent,
    calc(100% - 50px),
    transparent
  );
}

.well {
  position: relative;
  position: relative;
  /* background-image: url(/frame/Midgard-frame.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain; */

  background-image: url(/frames/right.png), url(/frames/left.png), url(/frames/center.png);
  background-position:
    right,
    left,
    left center;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size:
    contain,
    contain,
    calc(100% - 50px) 100%;
}

> h1 {
  text-align: left;
  font-size: 1.4em;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
