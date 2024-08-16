<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
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
          minHeight: '100px',
          // row
          display: 'flex',
          flexWrap: 'wrap', /* Allows columns to wrap onto new lines */
          // marginRight: '-15px',
          // marginLeft: '-15px',
          minWidth: '100px'
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props">
    <slot></slot>
  </ElementTemplate>
</template>
