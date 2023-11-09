<script setup lang="ts">
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
        height: 'auto',
        fontSize: '14px',
        minHeight: '100px',
        width: '100%',
        display: 'block'
      }
    }
  },
  methods: {
    filteredElements() {
      let children = []
      for (const element of elementsStore.dom.children) {
        if (element.parentId == this.id) {
          children.push(element)
        }
      }
      return children
    }
  }
}
</script>

<template>
  <ElementTemplate :id="id" tag="div" className="b-box" :elementStyles="defaultStyles">
    <component
      v-for="element in filteredElements()"
      :is="element.type"
      v-bind:key="element.id"
      :id="element.id"
    />
  </ElementTemplate>
</template>
