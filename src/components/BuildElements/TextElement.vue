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
        isNestable: false,
        tag: 'p',
        className: 'b-text',
        elementConfig: {
          text: 'lorem ipsum valis margulis',
          tag: 'p'
        },
        elementStyles: {
          width: 'auto',
          padding: '0',
          margin: '0',
          color: '#000'
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props">
    {{ elementsStore.getElementData(id)?.element.config.text }}
  </ElementTemplate>
</template>
