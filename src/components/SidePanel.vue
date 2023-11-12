<script setup lang="ts">
import { elementsStore } from '../stores/elementsStore'
import { activeStore } from '../stores/activeStore'
import ElementStyles from './ElementStyles.vue'
import ElementConfig from './ElementConfig.vue'
import ElementsToInsert from './ElementsToInsert.vue'
</script>

<script lang="ts">
  export default {
    methods: {
      deleteStyle(key: string|number) {
        delete activeStore.updatedStyles[key]
      },
      addNewStyle(  ) {
        activeStore.updatedStyles['-'] = '';
      },
      changeKey(key: string|number, event, index: number) {
        let keyValues = Object.entries(activeStore.updatedStyles);
        keyValues.splice(index,0, [event.target.value, activeStore.updatedStyles[key]]);
        let newObj = Object.fromEntries(keyValues) 
        activeStore.updatedStyles = newObj;
        delete activeStore.updatedStyles[key];
      },
      changeValue(key: string|number, event) {
        activeStore.updatedStyles[key] = event.target.value;
      }
    }
  }
</script>

<template>
  <div id="side-panel">
    <h3>Global options</h3>
    <input id="showGrid" type="checkbox" v-model="elementsStore.showGrid" />
    <label for="showGrid">Show grid</label>
    <hr />
    <h3><small>Selected element </small>#{{ activeStore.active }}</h3>
    <hr />
    <!-- TODO: Do not allow to add elements inside of not nested elements like TextElement -->
    <div>
      <h3>Insert element</h3>
      <ElementsToInsert />
    </div>
    <hr />
    <div>
      <h3>Styles</h3>
      <ElementStyles 
        @changeKey="changeKey"
        @changeValue="changeValue"
        @deleteStyle="deleteStyle"
        @addNewStyle="addNewStyle"
        :updatedStyles="activeStore.updatedStyles"
       />
      <hr />
    </div>
    <div>
      <h3>Config</h3>
      <ElementConfig />
      <hr />
    </div>
  </div>
</template>
