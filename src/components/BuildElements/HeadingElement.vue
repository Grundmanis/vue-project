<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
import { elementsStore } from '../../stores/elementsStore'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      // required: true
    },
    text: {
      type: String,
    }
  },
  data() {
    return {
      props: {
        id: this.id || elementsStore.incrementedId++,
        className: 'b-text',
        config: {
          text: this.text || 'Playground title',
          tag: 'h1'
        },
        styles: {
          width: 'auto',
          padding: '0',
          margin: '0',
          color: '#000',
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props">
    {{ elementsStore.getElementData(props.id)?.element.config.text }}
  </ElementTemplate>
</template>
