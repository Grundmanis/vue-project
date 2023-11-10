import { computed } from 'vue'
import { activeStore } from '../stores/activeStore'
import { elementsStore } from '../stores/elementsStore.js'
import type { DomElementConfig } from '@/interfaces/DomElementConfig'
import type { DomElement } from '@/interfaces/DomElement'

// TODO: refactor and then delete
export function getConfig(
  id: number | undefined,
  key: keyof DomElementConfig,
  defaultValue: unknown
) {
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

export function getElement(
  id: number | undefined
): { key: number; element: DomElement } | undefined {
  let elementData = undefined
  elementsStore.dom.children.forEach((element, key) => {
    if (element.id === id) {
      elementData = {
        element,
        key
      }
      return
    }
  })

  return elementData
}
