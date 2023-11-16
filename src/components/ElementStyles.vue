<script setup lang="ts">
import type { DomElementStyles } from '@/interfaces/DomElementStyles'
import type { PropType } from 'vue'
</script>

<script lang="ts">
export default {
  props: {
    updatedStyles: {
      required: true,
      type: Object as PropType<DomElementStyles>
    }
  },
  emits: ['changeKey', 'changeValue', 'deleteStyle', 'addNewStyle'],
  data() {
    return {
      styleKeys: [
        '-',
        'display',
        'color',
        'textAlign',
        'padding',
        'margin',
        'marginRight',
        'textDecoration',
        'height',
        'minHeight',
        'backgroundColor',
        'fontSize',
        'width',
        'listStyleType',
        'overflow',
        'backgroundImage',
        'verticalAlign',
        'alignItems',
        'justifyContent',
        'flexRow',
      ]
    }
  }
}
</script>

<template>
  <div v-for="(style, key, index) in updatedStyles" v-bind:key="index">
    <select
      v-on:change="
        $emit('changeKey', key, ($event.currentTarget as HTMLInputElement)?.value, index)
      "
    >
      <option
        v-for="(styleKey, index) in styleKeys"
        :selected="key === styleKey"
        :key="index"
        :value="styleKey"
      >
        {{ styleKey }}
      </option>
    </select>
    <input
      :class="`b-styled-element b-style-${key}`"
      type="text"
      :value="updatedStyles[key]"
      v-on:input="$emit('changeValue', key, ($event.currentTarget as HTMLInputElement)?.value)"
    />
    <!-- v-model="activeStore.updatedStyles[key]" -->
    <button v-on:click="$emit('deleteStyle', key)"><small>remove</small></button>
  </div>
  <button v-on:click="$emit('addNewStyle')">Add new style</button>
</template>
