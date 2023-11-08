<script setup lang="ts">
import { activeStore } from '../../stores/activeStore.js'
import { elementsStore } from '../../stores/elementsStore.js'
</script>

<script lang="ts">

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      isHover: false,
      defaultStyles: {
        height: "auto",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "rgb(235 235 235)",
        // backgroundImage: "url('https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386.jpg')",
      },
    }
  },
  computed: {
    updatedStyles() {
      const styles = activeStore.active === this.id && Object.keys(activeStore.updatedStyles).length > 0 ? activeStore.updatedStyles : this.defaultStyles;
      
      // TOOD: save all data in one place 
      // This teeds for the duplicate action
      const elementData = this.getElement();
      if (elementData) {
        elementsStore.dom.children[elementData.key].styles = styles;
      }

      return styles;
    },
    isActive() {
      return activeStore.active === this.id ? 'active': '';
    },
  },
  methods: {
    activate() {
      activeStore.updatedStyles = this.updatedStyles;
      activeStore.active = this.id;
    },
    getElement() {
      for (const key in elementsStore.dom.children) {
        const element = elementsStore.dom.children[key];
        if (element.id === this.id) {
          return {
            element,
            key,
          }
        }
      }
    },
    hover() {
      this.isHover = !this.isHover;
    },
    filteredElements() {
      if (this.id === undefined) {
        return; // changes nothing
      }
      let children = [];
        for (const element of elementsStore.dom.children) {
          if (element.parentId == this.id) {
            children.push(element);
          }
        }
      return children;
    },
  }
}

</script>


<template>
  <div :style="updatedStyles" v-on:mouseover="hover" v-on:mouseout="hover" v-on:click.self="activate" :class="['b-element b-wrapper', isActive, isHover ? 'hovered': '']">
    <div class="b-actions-toolbar">
      <span>{{ id }}</span>
    </div>
  
    <component :is="element.type" v-for="element in filteredElements()" v-bind:key="element.id" :id="element.id" :type="element.type" /> 
    <slot></slot>
  </div>
  </template>
