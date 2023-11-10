<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { elementsStore, type DomElement } from '../stores/elementsStore'
  import { activeStore } from '../stores/activeStore'
  import BoxElement from './BuildElements/BoxElement.vue'
  import TextElement from './BuildElements/TextElement.vue'
</script>

<script lang="ts">
export default {
  methods: {
    addElement(component: unknown) {
      elementsStore.incrementedId++;
      const element: DomElement = {
        type: shallowRef(component),
        id: elementsStore.incrementedId,
        config: {},
        styles: {},
        parentId: activeStore.active
      }
      elementsStore.dom.children.push(element)
    }
  }
}
</script>

<template>
    <ul>
      <li>
        <button id="b-add-box" v-on:click="addElement(BoxElement)">Box</button>
      </li>
      <li>
        <button id="b-add-text" v-on:click="addElement(TextElement)">Text</button>
      </li>
    </ul>
</template>
