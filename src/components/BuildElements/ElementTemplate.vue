<script setup lang="ts">
import { shallowRef } from 'vue'
// @ts-ignore
import { activeStore } from '../../stores/activeStore.js'
// @ts-ignore
import { elementsStore } from '../../stores/elementsStore.js'
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { getElement } from '@/composable/computed'
</script>

<script lang="ts">
export default {
  props: {
    id: Number,
    tag: String,
    className: String,
    elementStyles: Object,
    elementConfig: Object
  },
  data() {
    return {
      isHover: false
    }
  },
  created() {
    const elementData = getElement(this.id)
    if (!elementData) {
      // console.error('no element data on created')
      return
    }
    if (!elementsStore.dom.children[elementData.key].styles) {
      elementsStore.dom.children[elementData.key].styles = this.elementStyles
    }

    if (
      this.elementConfig &&
      !Object.keys(elementsStore.dom.children[elementData.key].config).length
    ) {
      elementsStore.dom.children[elementData.key].config = this.elementConfig
    }
  },
  computed: {
    updatedStyles() {
      const elementData = getElement(this.id)
      if (!elementData) {
        // console.error('no element data on updatedStyles')
        return this.elementStyles
      }

      if (activeStore.active === this.id && Object.keys(activeStore.updatedStyles).length > 0) {
        elementsStore.dom.children[elementData.key].styles = activeStore.updatedStyles
        return activeStore.updatedStyles
      }

      return elementsStore.dom.children[elementData.key].styles
    },
    updatedConfig() {
      // TODO: not every element has config
      // return empty object?
      const elementData = getElement(this.id)
      if (!elementData) {
        // console.error('no element data on updatedStyles')
        return this.elementConfig
      }

      if (activeStore.active === this.id && Object.keys(activeStore.config).length) {
        elementsStore.dom.children[elementData.key].config = activeStore.config
        return activeStore.config
      }

      return elementsStore.dom.children[elementData.key].config
    },
    isActive() {
      return activeStore.active === this.id ? 'active' : ''
    }
  },
  methods: {
    activate() {
      const config = this.updatedConfig ? JSON.parse(JSON.stringify(this.updatedConfig)) : {} // TODO: not every el has config
      activeStore.updatedStyles = this.updatedStyles
      activeStore.active = this.id
      activeStore.config = config
    },
    hover(isHover: boolean) {
      this.isHover = isHover
    },
    removeElement() {
      const elementData = getElement(this.id)
      if (!elementData) {
        return
      }
      elementsStore.dom.children.splice(elementData.key, 1)
    },
    duplicateElement() {
      const elementData = getElement(this.id)
      if (!elementData) {
        return
      }
      const newId = elementsStore.incrementedId + 1
      elementsStore.incrementedId = newId
      const newStyles = JSON.parse(JSON.stringify(this.updatedStyles))
      const newConfig = this.updatedConfig // issue with ref
      const newElement = {
        id: newId,
        parentId: elementData.element.parentId,
        styles: newStyles,
        config: {
          text: newConfig.text,
          tag: newConfig.tag
        },
        type: shallowRef(elementData.element.type) // TODO: refactor, no need to copy
      }
      elementsStore.dom.children.splice(elementData.key, 0, newElement)
    }
  }
}
</script>

<template>
  <component
    :is="updatedConfig?.tag || tag" 
    :style="updatedStyles"
    v-on:mouseover="() => hover(true)"
    v-on:mouseout="() => hover(false)"
    v-on:click.self="activate"
    :class="[`b-element ${className}`, isActive, isHover ? 'hovered' : '']"
  >
    <div class="b-actions-toolbar">
      <span>#{{ id }}</span>
      <button v-if="id !== 1" title="Remove" class="b-action-remove" v-on:click="removeElement">
        <TrashIcon />
      </button>
      <button v-if="id !== 1" title="Duplicate" class="b-action-duplicate" v-on:click="duplicateElement">
        <DocumentDuplicateIcon />
      </button>
      <!-- <button title="Drag" class="b-action-drag">
        <ArrowsPointingOutIcon />
      </button> -->
    </div>
    <slot></slot>
  </component>
</template>
