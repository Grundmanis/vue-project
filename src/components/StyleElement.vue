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
    <input :class="`b-styled-element b-style-${name}`" type="text" v-model="activeStore.updatedStyles[name]">
</template>
