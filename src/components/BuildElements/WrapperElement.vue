<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      props: {
        id: this.id,
        isNestable: true,
        tag: "section",
        className: "b-wrapper",
        elementStyles: {
          height: 'auto',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: 'rgb(235 235 235)',
          // backgroundImage: "url('https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386.jpg')",
        },
      }
    }
  }
}
</script>

<template>
  <ElementTemplate v-bind="props" />
</template>
