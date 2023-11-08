<script setup lang="ts">
  // @ts-ignore
  import { elementsStore } from '../stores/elementsStore.js'
</script>

<template>
  <div :class="[ elementsStore.showGrid ? 'showGrid' : '']" id="workarea">
    <component :is="elementsStore.dom.type" :id="elementsStore.dom.id"></component>
  </div>
</template>
