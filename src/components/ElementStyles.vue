<script setup lang="ts">
import { activeStore } from '../stores/activeStore'
</script>

<template>
  <div v-for="(style, key, index) in activeStore.updatedStyles" v-bind:key="index">
    <label>{{ key }}</label>
    <input
      :class="`b-styled-element b-style-${key}`"
      type="text"
      v-model="activeStore.updatedStyles[key]"
    />
  </div>
</template>
