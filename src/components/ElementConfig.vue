<script setup lang="ts">
// @ts-ignore
import { activeStore } from '../stores/activeStore.js'
</script>

<template>
   <div v-if="activeStore.config?.text !== undefined">
      <h4>Change the text</h4>
      <input type="text" class="b-text-element" v-model="activeStore.config.text" />
      <hr />
    </div>
    <div v-if="activeStore.config?.tag !== undefined">
      <h4>Change the type</h4>
      <input type="text" class="b-tag-element" v-model="activeStore.config.tag" />
      <hr />
    </div>
</template>
