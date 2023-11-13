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
        className: 'b-button',
        styles: {
          display: 'inline-block',
        },
        config: {
          children: {
            button: {
              styles: {
                fontSize: '14px'
              },
            }
          },
          text: 'Join us'
        }
      }
    }
  }
}
</script>

<template>
  
  <ElementTemplate v-bind="props">
    <button :style="elementsStore.getElementConfig(id, 'children')['button']?.styles">
      {{ elementsStore.getElementConfig(id, 'text') }}
    </button>
  </ElementTemplate>
</template>
