import { computed } from 'vue'
import { activeStore } from '../stores/activeStore'
import { elementsStore } from '../stores/elementsStore.js'

// TODO: refactor and then delete 
export function getConfig(id: number | undefined, key: string, defaultValue: unknown) {
  return computed(() => {
    const elementData = getElement(id)
    if (!elementData) {
      console.error('no element data on updatedStyles')
      return defaultValue
    }

    if (activeStore.active === id && Object.keys(activeStore.config).length) {
      elementsStore.dom.children[elementData.key].config = activeStore.config
      return activeStore.config[key]
    }

    return elementsStore.dom.children[elementData.key].config[key]
  })
}

export function getElement(id: number | undefined) {
  for (const key in elementsStore.dom.children) {
    const element = elementsStore.dom.children[key]
    if (element.id === id) {
      return {
        element,
        key
      }
    }
  }
}
