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
        className: 'b-img',
        config: {
          src: 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
        },
        styles: {
          width: '300px',
          padding: '0',
          margin: '0'
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props">
    <img :src="elementsStore.getElementData(id)?.element.config.src" />
  </ElementTemplate>
</template>
