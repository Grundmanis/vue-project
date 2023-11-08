<script setup lang="ts">
import { activeStore } from '../stores/activeStore.js'
</script>

<script lang="ts">


export default {
  props: {
    name: String
  },
  data() {
    return {}
  },
  methods: {
    addElement(type: string) {
    }
  }
}

</script>

<template>
    <label>{{ name }}</label>
    <input type="text" v-model="activeStore.updatedStyles[name]">
</template>

<style scoped>
</style>
