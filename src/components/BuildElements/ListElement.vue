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
        className: 'b-list',
        config: {
          tag: 'ul',
          list: [
            {
              text: 'Home',
            },
            {
              text: 'About',
            },
            {
              text: 'Price',
            },
            {
              text: 'Contacts',
            },
          ],
        },
        styles: {
          width: '300px',
          fontSize: '14px',
          color: '#000',
          listStyleType: 'disc',
          padding: '0 0 0 40px',
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props">
    <li :key="index" v-for="(listElement, index) in elementsStore.getElementData(id)?.element.config.list">{{ listElement.text }}</li>
  </ElementTemplate>
</template>
