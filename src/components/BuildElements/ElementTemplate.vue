<script setup lang="ts">
import { shallowRef, type PropType } from 'vue'
import { activeStore } from '../../stores/activeStore'
import { elementsStore } from '../../stores/elementsStore'
import type { DomElementConfig } from '@/interfaces/DomElementConfig'
import type { DomElementStyles } from '@/interfaces/DomElementStyles'
import ElementToolbar from '../ElementToolbar.vue'
import * as Obj from '@/helpers/Obj'
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
    styles: {
      type: Object as PropType<DomElementStyles>,
      required: true
    },
    config: Object as PropType<DomElementConfig>,
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

    if (Obj.isEmpty(elementData.element.styles)) {
      elementData.element.styles = this.styles
    }
    if (this.config && Obj.isEmpty(elementData.element.config)) {
      elementData.element.config = this.config
    }
  },
  computed: {
    updatedStyles() {
      const elementData = elementsStore.getElementData(this.id)
      if (!elementData) {
        return this.styles
      }

      if (activeStore.active === this.id && !Obj.isEmpty(activeStore.updatedStyles)) {
        elementData.element.styles = activeStore.updatedStyles
        return activeStore.updatedStyles
      }

      return elementData.element.styles
    },
    updatedConfig() {
      // if (!this.config) {
      //   return {};
      // }
      const elementData = elementsStore.getElementData(this.id)
      if (!elementData) {
        return this.config
      }

      if (activeStore.active === this.id && !Obj.isEmpty(activeStore.config)) {
        elementData.element.config = activeStore.config
        return activeStore.config
      }

      return elementData.element.config
    },
    isActive() {
      return activeStore.active === this.id ? 'active' : ''
    },
  },
  methods: {
    activate() {
      // TODO: check the ref issue with config\
      const updatedConfig = this.updatedConfig
      const config = updatedConfig ? Obj.clone(updatedConfig) : {} // TODO: not every el has config
      
      activeStore.updatedStyles = this.updatedStyles
      activeStore.active = this.id
      activeStore.config = config
    },
    setMouseOver(isMouseOver: boolean) {
      // TOOD: move to computed?
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
      const newStyles = Obj.clone(this.updatedStyles)
      const updatedConfig = this.updatedConfig
      const newConfig = updatedConfig ? Obj.clone(updatedConfig) : {}

      const newElement = {
        id: elementsStore.incrementedId,
        parentId: elementData.element.parentId,
        styles: newStyles,
        config: newConfig,
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
    v-on:mouseover="() => setMouseOver(true)"
    v-on:mouseout="() => setMouseOver(false)"
    v-on:click.capture="activate"
    :class="[`b-element ${className}`, isActive, isMouseOver ? 'hovered' : '']"
  >
    <ElementToolbar :id="id" @onRemove="removeElement" @onDuplicate="duplicateElement"  />

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
