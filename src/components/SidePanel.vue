<script setup lang="ts">
import { shallowRef } from 'vue'
import { elementsStore } from '../stores/elementsStore.js'
import { activeStore } from '../stores/activeStore.js'
import StyleElement from './StyleElement.vue'
import Box from './BElements/Box.vue'
</script>

<script lang="ts">


export default {
  data() {
    return {}
  },
  methods: {
    addElement(component) {
      const newId = elementsStore.incrementedId+1;
      elementsStore.incrementedId = newId;
      console.log('new id', newId);
      const element = {
        type: shallowRef(component),
        id: newId,
        parentId: activeStore.active,
      }
      elementsStore.dom.children.push(element);
      // activeStore.active = newId;
    }
  }
}

</script>

<template>
  <div id="side-panel">
    <div class="row">
      <div class="col">
        <h4>Global options</h4>
        <input id="showGrid" type="checkbox" v-model="elementsStore.showGrid" />
        <label for="showGrid">Show grid</label>
        <hr>
        <h3><small>Selected element </small>#{{ activeStore.active }}</h3>
        <hr>
        <h4>Insert element</h4>
        <ul>
          <li>
            <button v-on:click="addElement(Box)">Box</button>
          </li>
        </ul>
        <hr>
        <h4>Update styles</h4>
        <div v-for="(style, index) in activeStore.updatedStyles" v-bind:key="index">
          <StyleElement :name="index" />
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
