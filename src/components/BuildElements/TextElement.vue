<script setup lang="ts">
// @ts-ignore
import { getConfig } from '@/composable/computed'
import ElementTemplate from './ElementTemplate.vue'
</script>

<script lang="ts">
export default {
  props: {
    id: Number
  },
  data() {
    return {
      defaultStyles: {
        width: 'auto',
        padding: '0',
        margin: '0',
        color: '#000'
      },
      config: {
        text: 'lorem ipsum valis margulis',
        tag: 'p' // TODO: write tests for tag
      }
    }
  }
}
</script>

<template>
  <ElementTemplate
    :id="id"
    className="b-text"
    :elementStyles="defaultStyles"
    :elementConfig="config"
    :tag="config.tag"
  >
    {{ getConfig(id, 'text', config.text) }}
  </ElementTemplate>
</template>
