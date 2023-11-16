<script setup lang="ts">
import { shallowRef } from 'vue'
import { elementsStore } from '../stores/elementsStore'
import { activeStore } from '../stores/activeStore'
import BoxElement from './BuildElements/BoxElement.vue'
import TextElement from './BuildElements/TextElement.vue'
import ImageElement from './BuildElements/ImageElement.vue'
import ListElement from './BuildElements/ListElement.vue'
import Navbar from './BuildElements/Navbar.vue'
import type { DomElement } from '@/interfaces/DomElement'
import InputElement from './BuildElements/InputElement.vue'
import ButtonElement from './BuildElements/ButtonElement.vue'
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
      <button id="b-add-horizontal-menu" v-on:click="addElement(Navbar)">
        Navbar
      </button>
    </li>
    <li>
      <button id="b-add-input" v-on:click="addElement(InputElement)">
        Input
      </button>
    </li>
    <li>
      <button id="b-add-button" v-on:click="addElement(ButtonElement)">
        Button
      </button>
    </li>
  </ul>
</template>
