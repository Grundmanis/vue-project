<script setup lang="ts">
// @ts-ignore
import { activeStore } from '../../stores/activeStore.js'
// @ts-ignore
import { elementsStore } from '../../stores/elementsStore.js'
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
        width: 'auto',
        padding: '0',
        margin: '0',
        color: '#000'
      },
      config: {
        text: 'lorem ipsum valis margulis',
        tag: 'p'
      }
    }
  },
  computed: {
    updatedConfig() {
      const elementData = this.getElement()
      if (!elementData) {
        console.error('no element data on updatedStyles')
        return this.config;
      }

      if (activeStore.active === this.id && Object.keys(activeStore.config).length) {
        elementsStore.dom.children[elementData.key].config = activeStore.config
        return activeStore.config
      }

      return elementsStore.dom.children[elementData.key].config
    },
  },
  methods: {
    getElement() {
      for (const key in elementsStore.dom.children) {
        const element = elementsStore.dom.children[key]
        if (element.id === this.id) {
          return {
            element,
            key
          }
        }
      }
    },
  }
}
</script>

<template>
  
  <ElementTemplate :id="id" :tag="updatedConfig.tag" className="b-text" :elementStyles="defaultStyles" :elementConfig="config">
    {{ updatedConfig.text }}
  </ElementTemplate>

</template>
