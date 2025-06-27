<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Contingents</th>
          <th :key="cp.name" v-for="cp in force.contingentPoints">{{ cp.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-if="force.contingentPoints?.length === 0">No assignments</td>
          <th v-else></th>
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

<style lang="scss" scoped>
table {
  margin-bottom: 0;
  tbody {
    tr {
      td {
        padding-left: 1.6rem;
        padding-right: 1.6rem;
      }
    }
  }
}
</style>
