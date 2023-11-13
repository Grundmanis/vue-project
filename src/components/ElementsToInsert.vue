<script setup lang="ts">
import { shallowRef } from 'vue'
import { elementsStore } from '../stores/elementsStore'
import { activeStore } from '../stores/activeStore'
import BoxElement from './BuildElements/BoxElement.vue'
import TextElement from './BuildElements/TextElement.vue'
import ImageElement from './BuildElements/ImageElement.vue'
import ListElement from './BuildElements/ListElement.vue'
import HorizontalMenuElement from './BuildElements/HorizontalMenuElement.vue'
import type { DomElement } from '@/interfaces/DomElement'
</script>

<script lang="ts">
export default {
  methods: {
    addElement(component: unknown) {
      elementsStore.incrementedId++
      const element: DomElement = {
        type: shallowRef(component),
        id: elementsStore.incrementedId,
        config: {},
        styles: {},
        parentId: activeStore.active
      }
      elementsStore.elements.push(element)
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
    <li>
      <button id="b-add-image" v-on:click="addElement(ImageElement)">Image</button>
    </li>
    <li>
      <button id="b-add-list" v-on:click="addElement(ListElement)">List</button>
    </li>
    <li>
      <button id="b-add-list" v-on:click="addElement(HorizontalMenuElement)">
        Horizontal menu
      </button>
    </li>
  </ul>
</template>
