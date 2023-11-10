<script setup lang="ts">
import { shallowRef, type PropType } from 'vue'
import { activeStore } from '../../stores/activeStore'
import { elementsStore } from '../../stores/elementsStore'
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline'
import type { DomElementConfig } from '@/interfaces/DomElementConfig'
import type { DomElementStyles } from '@/interfaces/DomElementStyles'
import { isEmpty } from '@/helpers/Obj'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    tag: String,
    className: String,
    elementStyles: {
      type: Object as PropType<DomElementStyles>,
      required: true
    },
    elementConfig: Object as PropType<DomElementConfig>,
    isNestable: Boolean
  },
  data() {
    return {
      isMouseOver: false
    }
  },
  created() {
    const elementData = elementsStore.getElementData(this.id)
    if (!elementData) {
      return
    }

    if (isEmpty(elementData.element.styles)) {
      elementsStore.elements[elementData.index].styles = this.elementStyles
    }
    if (this.elementConfig && isEmpty(elementData.element.config)) {
      elementsStore.elements[elementData.index].config = this.elementConfig
    }
  },
  computed: {
    updatedStyles() {
      const elementData = elementsStore.getElementData(this.id)
      if (!elementData) {
        return this.elementStyles
      }

      if (activeStore.active === this.id && !isEmpty(activeStore.updatedStyles)) {
        elementsStore.elements[elementData.index].styles = activeStore.updatedStyles
        return activeStore.updatedStyles
      }

      return elementData.element.styles
    },
    updatedConfig() {
      // TODO: not every element has config
      // return empty object?
      const elementData = elementsStore.getElementData(this.id)
      if (!elementData) {
        return this.elementConfig
      }

      if (activeStore.active === this.id && !isEmpty(activeStore.config)) {
        elementsStore.elements[elementData.index].config = activeStore.config
        return activeStore.config
      }

      return elementData.element.config
    },
    isActive() {
      return activeStore.active === this.id ? 'active' : ''
    }
  },
  methods: {
    activate() {
      // TODO: check the ref issue with config
      const config = this.updatedConfig ? JSON.parse(JSON.stringify(this.updatedConfig)) : {} // TODO: not every el has config
      activeStore.updatedStyles = this.updatedStyles
      activeStore.active = this.id
      activeStore.config = config
    },
    hover(isMouseOver: boolean) { // TOOD: move to computed?
      this.isMouseOver = isMouseOver
    },
    removeElement() {
      const elementData = elementsStore.getElementData(this.id)
      if (!elementData) {
        return
      }
      elementsStore.elements.splice(elementData.index, 1)
    },
    childElements() {
      const children = []
      for (const element of elementsStore.elements) {
        if (element.parentId == this.id) {
          children.push(element)
        }
      }
      return children
    },
    duplicateElement() {
      const elementData = elementsStore.getElementData(this.id)
      if (!elementData) {
        return
      }
      elementsStore.incrementedId++
      const newStyles = JSON.parse(JSON.stringify(this.updatedStyles))
      const newConfig = this.updatedConfig // TODO: check the issue with ref
      const newElement = {
        id: elementsStore.incrementedId,
        parentId: elementData.element.parentId,
        styles: newStyles,
        config: {
          text: newConfig?.text,
          tag: newConfig?.tag
        },
        type: shallowRef(elementData.element.type) // TODO: refactor, no need to copy the whole object
      }
      elementsStore.elements.splice(elementData.index, 0, newElement)
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
    :class="[`b-element ${className}`, isActive, isMouseOver ? 'hovered' : '']"
  >
    <div class="b-actions-toolbar">
      <span>#{{ id }}</span>
      <button v-if="id !== elementsStore.dom.id" title="Remove" class="b-action-remove" v-on:click="removeElement">
        <TrashIcon />
      </button>
      <button
        v-if="id !== 1"
        title="Duplicate"
        class="b-action-duplicate"
        v-on:click="duplicateElement"
      >
        <DocumentDuplicateIcon />
      </button>
      <!-- <button title="Drag" class="b-action-drag">
        <ArrowsPointingOutIcon />
      </button> -->
    </div>

    <slot name="nested" v-if="isNestable">
      <component
        v-for="element in childElements()"
        :is="element.type"
        v-bind:key="element.id"
        :id="element.id"
        :type="element.type"
      />
    </slot>

    <slot></slot>
  </component>
</template>
