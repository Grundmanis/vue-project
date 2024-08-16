<script setup lang="ts">
  import { elementsStore } from '../../stores/elementsStore'
  // import { activeStore } from '../stores/activeStore'
  // import ElementStyles from './ElementStyles.vue'
  // import ElementConfig from './ElementConfig.vue'
  // import ElementsToInsert from './ElementsToInsert.vue'
  // import * as Obj from '../helpers/Obj'
  import router from '@/router'
  import { shallowRef, type PropType } from 'vue'
  import axios from 'axios'
</script>

<script lang="ts">
  export default {
    async beforeMount() {
    },
    methods: {
      historyBack() {
        // push current version to history

        const lastIndex = elementsStore.lastHistoryIndex || elementsStore.history.length - 1;
        // elementsStore.lastHistoryIndex = lastIndex;
        const elements = elementsStore.history[lastIndex];
        console.log("previous elements", elements);
        console.log("current elements", elementsStore.elements);
        // elementsStore.elements = shallowRef(elements);
        // if (lastIndex) {
        //   elementsStore.elements = elementsStore.history[lastIndex];
        //   console.log("updated");
        // }

      },
      historyForward() {

      }
    }
  }
</script>

<template>
  <div>
    <button v-on:click="router.push(`/`)">dashboard</button> <button v-on:click="historyBack">back</button> 
    <button v-on:click="historyForward">forward</button>
  </div>
</template>
