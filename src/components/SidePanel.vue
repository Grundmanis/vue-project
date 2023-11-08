<script setup lang="ts">
  import { shallowRef } from 'vue'
  // @ts-ignore
  import { elementsStore } from '../stores/elementsStore.js'
  // @ts-ignore
  import { activeStore } from '../stores/activeStore.js'
  import StyleElement from './StyleElement.vue'
  import BoxElement from './BuildElements/BoxElement.vue'
</script>

<script lang="ts">
  export default {
    methods: {
      addElement(component: typeof BoxElement) {
        const newId = elementsStore.incrementedId+1; // ++
        elementsStore.incrementedId = newId;
        const element = {
          type: shallowRef(component),
          id: newId,
          parentId: activeStore.active,
        }
        elementsStore.dom.children.push(element);
      }
    }
  }
</script>

<template>
  <div id="side-panel">
    <h4>Global options</h4>
    <input id="showGrid" type="checkbox" v-model="elementsStore.showGrid" />
    <label for="showGrid">Show grid</label>
    <hr>
    <h3><small>Selected element </small>#{{ activeStore.active }}</h3>
    <hr>
    <h4>Insert element</h4>
    <ul>
      <li>
        <button v-on:click="addElement(BoxElement)">Box</button>
      </li>
    </ul>
    <hr>
    <h4>Update styles</h4>
    <div v-for="(style, index) in activeStore.updatedStyles" v-bind:key="index">
      <StyleElement :name="index" />
    </div>
    <hr>
  </div>
</template>
