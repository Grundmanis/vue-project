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
        width: 'auto',
        padding: '0',
        margin: '0',
        color: '#000'
        // backgroundImage: "url('https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386.jpg')",
      },
      config: {
        text: 'lorem ipsum valis margulis',
        tag: 'p'
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
    if (!Object.keys(elementsStore.dom.children[elementData.key].config).length) {
      console.log('setting default config', elementsStore.dom.children[elementData.key].config)
      elementsStore.dom.children[elementData.key].config = this.config
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
    updatedConfig() {
      const elementData = this.getElement()
      if (!elementData) {
        console.error('no element data on updatedStyles')
        return this.defaultStyles
      }

      console.log('updated config element', elementData)

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
      const config = JSON.parse(JSON.stringify(this.updatedConfig)) // TODO: DOES NOT WORK
      console.log('activate, set config', config)
      activeStore.updatedStyles = this.updatedStyles
      activeStore.active = this.id
      activeStore.config = config
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

  <p
    v-if="updatedConfig.tag === 'p'"
    :style="updatedStyles"
    v-on:mouseover="() => hover(true)"
    v-on:mouseout="() => hover(false)"
    v-on:click.self="activate"
    :class="['b-element b-text', isActive, isHover ? 'hovered' : '']"
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

    {{ updatedConfig.text }}

    <!-- 
      No child components I think, maybe later only if icon/small
      <component
      :is="element.type"
      v-for="element in filteredElements()"
      v-bind:key="element.id"
      :id="element.id"
      :type="element.type"
    /> -->
    <!-- 
      No slots needed
      <slot></slot> -->
    </p>
    
  <h1
    v-if="updatedConfig.tag === 'h1'"
    :style="updatedStyles"
    v-on:mouseover="() => hover(true)"
    v-on:mouseout="() => hover(false)"
    v-on:click.self="activate"
    :class="['b-element b-text', isActive, isHover ? 'hovered' : '']"
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

    {{ updatedConfig.text }}

    <!-- 
      No child components I think, maybe later only if icon/small
      <component
      :is="element.type"
      v-for="element in filteredElements()"
      v-bind:key="element.id"
      :id="element.id"
      :type="element.type"
    /> -->
    <!-- 
      No slots needed
      <slot></slot> -->
    </h1>

</template>
