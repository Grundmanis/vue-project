<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
import { filteredElements } from '@/composable/computed'
</script>

<script lang="ts">
export default {
  props: {
    id: Number
  },
  data() {
    return {
      defaultStyles: {
        height: 'auto',
        fontSize: '14px',
        minHeight: '100px',
        width: '100%',
        display: 'block'
      }
    }
  }
}
</script>

<template>
  <ElementTemplate :id="id" tag="div" className="b-box" :elementStyles="defaultStyles">
    <component
      v-for="element in filteredElements(id)"
      :is="element.type"
      v-bind:key="element.id"
      :id="element.id"
    />
  </ElementTemplate>
</template>
