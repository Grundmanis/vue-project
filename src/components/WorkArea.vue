<script setup lang="ts">
  // @ts-ignore
  import { elementsStore } from '../stores/elementsStore.js'
  import WrapperElement from './BuildElements/WrapperElement.vue';
</script>

<template>
  <div :class="[ elementsStore.showGrid ? 'showGrid' : '', 'col']" id="workarea">
    <WrapperElement :id="elementsStore.dom.id"></WrapperElement>
  </div>
</template>
