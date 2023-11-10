<script setup lang="ts">
import { elementsStore } from '../stores/elementsStore'
import { activeStore } from '../stores/activeStore'
import ElementStyles from './ElementStyles.vue'
import ElementConfig from './ElementConfig.vue'
import ElementsToInsert from './ElementsToInsert.vue'
</script>

<template>
  <div id="side-panel">
    <h3>Global options</h3>
    <input id="showGrid" type="checkbox" v-model="elementsStore.showGrid" />
    <label for="showGrid">Show grid</label>
    <hr />
    <h3><small>Selected element </small>#{{ activeStore.active }}</h3>
    <hr />
    <!-- Do not allow to add elements inside of not nested elements like TextElement -->
    <div>
      <h3>Insert element</h3>
      <ElementsToInsert />
    </div>
    <hr />
    <div>
      <h3>Styles</h3>
      <ElementStyles />
      <hr />
    </div>
    <div>
      <h3>Config</h3>
      <ElementConfig />
      <hr />
    </div>
  </div>
</template>
