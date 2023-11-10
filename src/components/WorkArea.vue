<script setup lang="ts">
import { elementsStore } from '../stores/elementsStore'
</script>

<template>
  <div :class="[elementsStore.showGrid ? 'showGrid' : '']" id="workarea">
    <component :is="elementsStore.dom.type" :id="elementsStore.dom.id"></component>
  </div>
</template>
