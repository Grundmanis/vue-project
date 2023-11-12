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
        className: 'b-horizontal-menu',
        tag: 'ul',
        config: {
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
          children: {
            'a': {
              styles: {
                display: 'block',
                color: 'white',
                textAlign: 'center',
                padding: '14px 16px',
                textDecoration: 'none',
                fontSize: '14px',
              },
            }
          }
        },
        styles: {
          padding: 0,
          margin: 0,
          overflow: 'hidden',
          backgroundColor: '#333',
          listStyleType: 'none',
        }
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props">
    <li :key="index" v-for="(listElement, index) in elementsStore.getElementData(id)?.element.config.list">
      <a href="#" :style="elementsStore.getElementData(id)?.element.config.children['a'].styles">
        {{ listElement.text }}
      </a>
    </li>
  </ElementTemplate>
</template>
