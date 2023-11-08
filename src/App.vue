<script setup lang="ts">
import SidePanel from "./components/SidePanel.vue";
import "./assets/main.css";
import { elementsStore } from './stores/elementsStore.js'
import WrapperVue from "./components/BElements/Wrapper.vue";
</script>

<script lang="ts">

export default {
    data() {
        return {
            showGrid: true,
        };
    },
    components: { WrapperVue }
}

</script>

<template>
<div class="container-fluid">
  <SidePanel />
  <div :class="{ showGrid: showGrid, 'col': true}" id="workarea">
    <WrapperVue :id="elementsStore.dom.id"></WrapperVue>
  </div>
</div>

</template>

<style>
</style>
