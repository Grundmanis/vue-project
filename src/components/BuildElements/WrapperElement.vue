<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
import { filteredElements } from '@/composable/computed'
</script>

<script lang="ts">
export default {
  props: {
    id: Number
  },
  data() {
    return {
      defaultStyles: {
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'rgb(235 235 235)',
        // backgroundImage: "url('https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386.jpg')",
      }
    }
  }
}
</script>

<template>
  <ElementTemplate :id="id" tag="section" className="b-wrapper" :elementStyles="defaultStyles">
    <component
      v-for="element in filteredElements(id)"
      :is="element.type"
      v-bind:key="element.id"
      :id="element.id"
      :type="element.type"
    />
  </ElementTemplate>
</template>
