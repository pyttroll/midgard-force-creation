<template>
  <table style="margin-bottom: 0">
    <thead>
      <tr class="merged">
        <th colspan="8">{{ hero.name || '?' }}</th>
      </tr>
      <tr>
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
        <td>{{ hero.status.name }} (Level {{ hero.status.level }})</td>
        <td>{{ hero.points }}</td>
        <td>{{ hero.combatDice }}</td>
        <td>{{ hero.shootingDice }}</td>
        <td>{{ hero.armour }}</td>
        <td>{{ hero.stamina }}</td>
        <td>{{ hero.reputation }}</td>
        <td>{{ hero.missileType ? hero.missileType.name : 'None' }}</td>
      </tr>
    </tbody>
  </table>
  <table style="border-top-width: 0">
    <tbody>
      <template v-if="hero.traits?.length > 0">
        <!-- <tr class="section">
          <td colspan="9">TRAITS</td>
        </tr> -->
        <tr class="trait" v-for="trait in hero.traits" :key="trait.name">
          <td>{{ trait.name }}</td>
          <td>{{ trait.description }}</td>
        </tr>
      </template>
      <template v-if="hero.spells?.length > 0">
        <tr class="section" v-if="hero.spells?.length > 0">
          <td colspan="2">SPELLS</td>
        </tr>
        <tr class="spell">
          <td colspan="2">{{ hero.spells.map((x) => x?.name || '?').join(', ') }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import Hero from '@/models/Hero'

defineProps({
  hero: Hero,
})
</script>
