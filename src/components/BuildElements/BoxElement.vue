<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
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
  <ElementTemplate :isNestable="true" :id="id" tag="div" className="b-box" :elementStyles="defaultStyles" />
</template>
