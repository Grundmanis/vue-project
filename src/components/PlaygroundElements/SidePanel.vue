<script setup lang="ts">
  import { elementsStore } from '../../stores/elementsStore'
  import { activeStore } from '../../stores/activeStore'
  import ElementStyles from './ElementStyles.vue'
  import ElementConfig from './ElementConfig.vue'
  import ElementsToInsert from './ElementsToInsert.vue'
  import * as Obj from '../../helpers/Obj'
  import router from '@/router'
  import axios from 'axios'
</script>

<script lang="ts">
  export default {
    async beforeMount() {
      await this.getTemplate();
    },
    methods: {
      deleteStyle(key: string) {
        elementsStore.updateHistory();
        delete activeStore.updatedStyles[key]
      },
      addNewStyle() {
        elementsStore.updateHistory();
        activeStore.updatedStyles['-'] = ''
      },
      changeKey(key: string, newValue: string, index: number) {
        elementsStore.updateHistory();
        let keyValues = Object.entries(activeStore.updatedStyles)
        keyValues.splice(index, 0, [newValue, activeStore.updatedStyles[key]])
        let newObj = Object.fromEntries(keyValues)
        activeStore.updatedStyles = newObj
        delete activeStore.updatedStyles[key]
      },
      changeValue(key: string, newValue: string) {
        console.log("change value");
        elementsStore.updateHistory();
        activeStore.updatedStyles[key] = newValue
        // elementsStore.saveElements();
      },
      async getTemplate() {
        const url = router.currentRoute.value.params.code;
        const response = await axios.get(`http://localhost:8000/templates/${url}`);
        const template = elementsStore.parseStringElements(response.data.code);
        console.log("template",template);
      }
    }
  }
</script>

<template>
  <div id="side-panel">
    <h3>Global options</h3>
    <input id="showGrid" type="checkbox" v-model="elementsStore.showGrid" />
    <label for="showGrid">Show grid</label>
    <hr />
    <!-- TODO: Do not allow to add elements inside of not nested elements like TextElement -->
    <div>
      <h3>Insert element</h3>
      <ElementsToInsert />
    </div>
    <hr />
    <h3><small>Selected element </small>#{{ activeStore.active }}</h3>
    <hr />
    <div v-if="!Obj.isEmpty(activeStore.updatedStyles)">
      <h3>Styles</h3>
      <ElementStyles
        @changeKey="changeKey"
        @changeValue="changeValue"
        @deleteStyle="deleteStyle"
        @addNewStyle="addNewStyle"
        :updatedStyles="activeStore.updatedStyles"
      />
      <hr />
    </div>
    <div v-if="!Obj.isEmpty(activeStore.config)">
      <div>
        <h3>Config</h3>
        <ElementConfig />
        <hr />
      </div>
    </div>
  </div>
</template>
