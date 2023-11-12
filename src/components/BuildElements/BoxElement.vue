<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      props: {
        id: this.id,
        isNestable: true,
        tag: 'div',
        className: 'b-box',
        styles: {
          height: 'auto',
          fontSize: '14px',
          minHeight: '100px',
          width: '100%',
          display: 'block'
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props" />
</template>
