<script setup lang="ts">
  // @ts-ignore
  import { activeStore } from '../stores/activeStore.js'
</script>

<script lang="ts">

export default {
  props: {
    name: String
  },
}

</script>

<template>
    <label>{{ name }}</label>
    <input type="text" v-model="activeStore.updatedStyles[name]">
</template>
