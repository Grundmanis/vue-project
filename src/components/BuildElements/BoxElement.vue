<script setup lang="ts">
import { shallowRef } from 'vue'
// @ts-ignore
import { activeStore } from '../../stores/activeStore.js'
// @ts-ignore
import { elementsStore } from '../../stores/elementsStore.js'
import { DocumentDuplicateIcon, TrashIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/outline'
</script>

<script lang="ts">
export default {
  props: {
    id: Number
  },
  data() {
    return {
      isHover: false,
      defaultStyles: {
        height: 'auto',
        fontSize: '14px',
        minHeight: '100px',
        width: '100%',
        display: 'block'
        // backgroundImage: "url('https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386.jpg')",
      }
    }
  },
  created() {
    const elementData = this.getElement()
    if (!elementData) {
      console.error('no element data on created')
      return
    }
    if (!elementsStore.dom.children[elementData.key].styles) {
      elementsStore.dom.children[elementData.key].styles = this.defaultStyles
    }
  },
  computed: {
    updatedStyles() {
      const elementData = this.getElement()
      if (!elementData) {
        console.error('no element data on updatedStyles')
        return this.defaultStyles
      }

      if (activeStore.active === this.id && Object.keys(activeStore.updatedStyles).length > 0) {
        elementsStore.dom.children[elementData.key].styles = activeStore.updatedStyles
        return activeStore.updatedStyles
      }

      return elementsStore.dom.children[elementData.key].styles
    },
    isActive() {
      return activeStore.active === this.id ? 'active' : ''
    }
  },
  methods: {
    activate() {
      activeStore.updatedStyles = this.updatedStyles
      activeStore.active = this.id
    },
    getElement() {
      for (const key in elementsStore.dom.children) {
        const element = elementsStore.dom.children[key]
        if (element.id === this.id) {
          return {
            element,
            key
          }
        }
      }
    },
    hover(isHover: boolean) {
      this.isHover = isHover
    },
    filteredElements() {
      let children = []
      for (const element of elementsStore.dom.children) {
        if (element.parentId == this.id) {
          children.push(element)
        }
      }
      return children
    },
    removeElement() {
      // TODO: use getElement
      for (const key in elementsStore.dom.children) {
        const element = elementsStore.dom.children[key]
        if (element.id === this.id) {
          elementsStore.dom.children.splice(key, 1)
        }
      }
    },
    duplicateElement() {
      const elementData = this.getElement()
      if (!elementData) {
        return
      }
      const newId = elementsStore.incrementedId + 1
      elementsStore.incrementedId = newId
      const newStyles = JSON.parse(JSON.stringify(this.updatedStyles))
      const newElement = {
        id: newId,
        parentId: elementData.element.parentId,
        styles: newStyles,
        type: shallowRef(elementData.element.type) // TODO: refactor, no need to copy
      }

      elementsStore.dom.children.splice(elementData.key + 1, 0, newElement)
    }
  }
}
</script>

<template>
  <div
    :style="updatedStyles"
    v-on:mouseover="() => hover(true)"
    v-on:mouseout="() => hover(false)"
    v-on:click.self="activate"
    :class="['b-element b-box', isActive, isHover ? 'hovered' : '']"
  >
    <div class="b-actions-toolbar">
      <span>#{{ id }}</span>
      <button title="Remove" class="b-action-remove" v-on:click="removeElement">
        <TrashIcon />
      </button>
      <button title="Duplicate" class="b-action-duplicate" v-on:click="duplicateElement">
        <DocumentDuplicateIcon />
      </button>
      <button title="Drag" class="b-action-drag">
        <ArrowsPointingOutIcon />
      </button>
    </div>

    <component
      v-for="element in filteredElements()"
      :is="element.type"
      v-bind:key="element.id"
      :id="element.id"
    />
    <slot></slot>
  </div>
</template>
