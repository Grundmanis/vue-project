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
    <div v-for="(value, name, index) in activeStore.config" :key="index">
      <div v-if="!Arr.isArray(activeStore.config[name as keyof DomElementConfig])">
        <h4>Change the {{name}}</h4>
        <input type="text" class="b-text-element" v-model="activeStore.config[name as keyof DomElementConfig]" />
      </div>
      <!-- <div v-else>

        TODO: ts-error

        <h4>Update the {{name}}</h4>
        <div :key="index" v-for="(listElement, index) in value">
          <input type="text" class="b-list-text" v-model="listElement.text" />
          <button v-on:click="activeStore.config.list?.splice(index, 1)"><small>remove</small></button>
        </div>
        <button v-on:click="activeStore.config.list?.push({text: 'new element'})">Add new +</button>
      </div> -->
    </div>
    <div v-if="activeStore.config?.list !== undefined">
      <h4>Update the list</h4>
      <div :key="index" v-for="(listElement, index) in activeStore.config.list">
        <input type="text" class="b-src-list-text" v-model="listElement.text" />
        <button v-on:click="activeStore.config.list?.splice(index, 1)"><small>remove</small></button>
      </div>
      <button v-on:click="activeStore.config.list?.push({text: 'new element'})">Add new +</button>
      <hr />
    </div>
  </div>
</template>
