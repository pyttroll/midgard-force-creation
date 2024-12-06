<template>
  <table style="margin-bottom: 0">
    <thead>
      <tr class="merged">
        <th colspan="9">{{ unit.name }}</th>
      </tr>
      <tr>
        <th>Qty</th>
        <th>Type</th>
        <th>Points</th>
        <th>Combat</th>
        <th>Shooting</th>
        <th>Armour</th>
        <th>Stamina</th>
        <th>Reputation</th>
        <th>Missiles</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ unit.qty }}</td>
        <td>{{ unit.profile.type }} ({{ unit.profile.name }})</td>
        <td>{{ unit.points }}</td>
        <td>{{ unit.combatDice }}</td>
        <td>{{ unit.shootingDice }}</td>
        <td>
          {{ unit.armour }} <span v-if="unit.armourWhenShot">({{ unit.armourWhenShot }})</span>
        </td>
        <td>{{ unit.stamina }}</td>
        <td>{{ unit.reputation }}</td>
        <td>{{ unit.missileType ? unit.missileType.name : 'None' }}</td>
      </tr>
    </tbody>
  </table>
  <table style="border-top-width: 0">
    <tbody>
      <template v-if="unit.combinedTraits?.length > 0">
        <!-- <tr class="section">
          <td colspan="9">TRAITS</td>
        </tr> -->
        <tr class="trait" v-for="trait in unit.combinedTraits" :key="trait.name">
          <td colspan="2">{{ trait.name }}</td>
          <td colspan="7">{{ trait.description }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import Unit from '@/models/Unit'

defineProps({
  unit: Unit,
})
</script>
