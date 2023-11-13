<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
import { elementsStore } from '../../stores/elementsStore'
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
        tag: 'div',
        className: 'b-input',
        styles: {
          display: 'inline-block',
        },
        config: {
          children: {
            input: {
              styles: {
                fontSize: '14px'
              },
            }
          },
          placeholder: 'Search...'
        }
      }
    }
  }
}
</script>

<template>
  
  <ElementTemplate v-bind="props">
    <input :style="elementsStore.getElementConfig(id, 'children')['input']?.styles" :placeholder="elementsStore.getElementConfig(id, 'placeholder')" />
  </ElementTemplate>
</template>
