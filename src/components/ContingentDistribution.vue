<template>
  <div>
    <table>
      <thead>
        <tr>
          <th :key="cp.name" v-for="cp in force.contingentPoints">{{ cp.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :key="cp.name" v-for="cp in force.contingentPoints">{{ cp.points }} pts</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import Force from '@/models/Force'

interface IProps {
  force: Force
}

defineProps<IProps>()
</script>

<style lang="scss" scoped></style>
