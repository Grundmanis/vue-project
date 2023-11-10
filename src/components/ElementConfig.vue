<script setup lang="ts">
import { activeStore } from '../stores/activeStore'
import * as Obj from '../helpers/Obj'
import * as Arr from '../helpers/Arr'
import type { DomElementConfig } from '@/interfaces/DomElementConfig';
</script>

<script lang="ts">
export default {
  methods: {
  }
}
</script>


<template>
  <div v-if="!Obj.isEmpty(activeStore.config)">
    <div v-for="name, index in Object.keys(activeStore.config)" :key="index">
      <div v-if="!Arr.isArray(activeStore.config[name as keyof DomElementConfig])">
        <h4>Change the {{name}}</h4>
        <input type="text" class="b-text-element" v-model="activeStore.config[name as keyof DomElementConfig]" />
      </div>
      <div v-else>
        <h4>Update the {{name}}</h4>
        <div :key="index" v-for="(listElement, index) in activeStore.config[name as keyof DomElementConfig]">
          <input type="text" class="b-src-list-text" v-model="listElement.text" />
          <button v-on:click="activeStore.config.list?.splice(index, 1)"><small>remove</small></button>
        </div>
        <button v-on:click="activeStore.config.list?.push({text: 'new element'})">Add new +</button>
      </div>
    </div>
  </div>
</template>
