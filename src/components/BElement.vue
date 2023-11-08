<script setup lang="ts">
import { activeStore } from '../stores/activeStore.js'
import { elementsStore } from '../stores/elementsStore.js'
</script>


<script lang="ts">

export default {
  props: {
    type: Object, // not needed ?
    id: Number,
  },
  data() {
    return {
      defaultStyles: {
        height: "auto",
        minHeight: "100px",
        width: "100%",
        // backgroundImage: "url('https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386.jpg')",
      },
    }
  },
  computed: {
    updatedStyles() {
      return activeStore.active == this.id && Object.keys(activeStore.updatedStyles).length > 0 ? activeStore.updatedStyles : this.defaultStyles;
    },
    isActive() {
      return activeStore.active === this.id ? 'active': '';
    }
  },
  methods: {
    activate() {
      activeStore.updatedStyles = this.updatedStyles;
      activeStore.active = this.id;
      console.log('set active', this.id);
    },
    filteredElements() {
      if (this.id === undefined) {
        return; // changes nothing
      }
      let children = [];
        for (const element of elementsStore.dom.children) {
          if (element.parentId == this.id) {
            console.log("element", element.type);
            children.push(element);
          }
        }
      return children;
    },
    removeElement() {
      if (this.id === 1) {
        return; // not allowing to delete the dom
        // TOOD: do not show the delete button
      }

      console.log("deleting the id", this.id);

      for (const key in elementsStore.dom.children) {
        const element = elementsStore.dom.children[key];
        if (element.id === this.id) {
          elementsStore.dom.children.splice(key, 1);
        }
      }
    }
  }
}

// text
// div
// render specific component based on name/type

</script>

<template>
<div v-on:click.self="activate" :class="['b-element', isActive]">
  <button class="b-action-remove" v-on:click.self="removeElement">x</button>

  <component :is="type" :id="id" /> 
  <!-- <component :is="element.type" v-for="element in filteredElements()" v-bind:key="element.id" :id="element.id" :type="element.type" />  -->
  <slot></slot>
</div>
</template>

<style scoped>
</style>
