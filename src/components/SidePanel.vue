<script setup lang="ts">
import { shallowRef } from 'vue'
// @ts-ignore
import { elementsStore } from '../stores/elementsStore.js'
// @ts-ignore
import { activeStore } from '../stores/activeStore.js'
import StyleElement from './StyleElement.vue'
import BoxElement from './BuildElements/BoxElement.vue'
import TextElement from './BuildElements/TextElement.vue'
</script>

<script lang="ts">
export default {
  methods: {
    addElement(component: unknown) {

      const newId = elementsStore.incrementedId + 1 // ++
      elementsStore.incrementedId = newId
      const element = {
        type: shallowRef(component),
        id: newId,
        config: {},
        parentId: activeStore.active
      }
      elementsStore.dom.children.push(element)
    }
  }
}
</script>

<template>
  <div id="side-panel">
    <h4>Global options</h4>
    <input id="showGrid" type="checkbox" v-model="elementsStore.showGrid" />
    <label for="showGrid">Show grid</label>
    <hr />
    <h3><small>Selected element </small>#{{ activeStore.active }}</h3>
    <hr />
    <h4>Insert element</h4>
    <ul>
      <li>
        <button v-on:click="addElement(BoxElement)">Box</button>
      </li>
      <li>
        <button v-on:click="addElement(TextElement)">Text</button>
      </li>
    </ul>
    <hr />
    <div>
      <h4>Update styles</h4>
        <div v-for="(style, key, index) in activeStore.updatedStyles" v-bind:key="index">
          <StyleElement :name="key.toString()" />
        </div>
      <hr />
    </div>
    <div v-if="activeStore.config?.text !== undefined">
      <h4>Change the text</h4>
        <input type="text" class="b-text-element" v-model="activeStore.config.text" />
      <hr />
    </div>
    <div v-if="activeStore.config?.type !== undefined">
      <h4>Change the type</h4>
        <input type="text" class="b-type-element" v-model="activeStore.config.type" />
      <hr />
    </div>
  </div>
</template>
