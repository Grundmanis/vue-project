<script setup lang="ts">
  import { activeStore } from '../stores/activeStore'
  import * as Obj from '../helpers/Obj'
  import * as Arr from '../helpers/Arr'
  import ElementStyles from './ElementStyles.vue';
  import Vue from 'vue'
</script>

<script lang="ts">
export default {
    methods: {
      changeKey(key: string, passedKey: string, newKey: string, passedIndex: number) {
        if (!activeStore.config.children) {
          return;
        }
        let keyValues = Object.entries(activeStore.config.children[key].styles as Object);
        keyValues.splice(passedIndex, 0, [newKey, activeStore.config.children[key].styles[passedKey]]);
        let newObj = Object.fromEntries(keyValues) 

        activeStore.config.children[key].styles = newObj;
        delete activeStore.config.children[key].styles[passedKey];
      },
      changeStyle(key: string, passedKey: string, newValue: string) {
        if (!activeStore.config.children) {
          return;
        }
        activeStore.config.children[key].styles[passedKey] = newValue;
      },
      addNewStyle(key: string) {
        if (!activeStore.config.children) {
          return;
        }
        activeStore.config.children[key].styles['-'] = '';
      },
      deleteStyle(key: string, passedKey: string) {
        if (!activeStore.config.children) {
          return;
        }

        // TODO: refactor this lifehack
        let keyValues = Object.entries(activeStore.config.children[key].styles);
        let newObj = Object.fromEntries(keyValues) 
        activeStore.config.children[key].styles = newObj;
        delete activeStore.config.children[key].styles[passedKey];
      },
    },
    components: { ElementStyles }
}
</script>


<template>
  <div v-if="!Obj.isEmpty(activeStore.config)">
    <div v-for="(value, name, index) in activeStore.config" :key="index">
      <div v-if="!Arr.isArray(activeStore.config[name]) && !Obj.isObject(activeStore.config[name])">
        <h4>Change the {{name}}</h4>
        <input type="text" :class="`b-${name}-element`" v-model="activeStore.config[name]" />
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

    <div v-if="!Arr.isEmpty(activeStore.config?.list)">
      <h4>Update the list</h4>
      <div :key="index" v-for="(listElement, index) in activeStore.config.list">
        <input type="text" class="b-src-list-text" v-model="listElement.text" />
        <button v-on:click="activeStore.config.list?.splice(index, 1)"><small>remove</small></button>
      </div>
      <button v-on:click="activeStore.config.list?.push({text: 'new element'})">Add new +</button>
      <hr />
    </div>

    <div v-if="!Arr.isEmpty(activeStore.config?.children)">
      <h4>Update the children</h4>
      <div v-for="(element, key, index) in activeStore.config.children" :key="index">
        <div v-if="!Obj.isEmpty(element.styles)">

          <ElementStyles 
            @changeValue="(passedKey: string, newValue: string) => changeStyle(key.toString(), passedKey, newValue)" 
            :updatedStyles="element.styles" 
            @addNewStyle="() => addNewStyle(key.toString())" 
            @changeKey="(passedKey: string, newValue: string, passedIndex: number) => changeKey(key.toString(), passedKey, newValue, passedIndex)"
            @deleteStyle="(passedKey: string) => deleteStyle(key.toString(), passedKey)"
          />
          <!-- <div v-for="(style, styleKey, styleIndex) in element.styles" v-bind:key="styleIndex">
            <label>{{ styleKey }}</label>
            <input
              :class="`b-styled-element b-style-${styleKey}`"
              type="text"
              v-model="activeStore.config.children[key].styles[styleKey]"
            />
          </div>
          <button v-on:click="activeStore.config.children[key].styles['backgroundColor'] = 'green'">Add new +</button> -->


        </div>
      </div>
    </div>

  </div>
</template>
