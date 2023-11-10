import { computed } from 'vue'
import { activeStore } from '../stores/activeStore'
import { elementsStore, type DomElement, type DomElementConfig } from '../stores/elementsStore.js'

// TODO: refactor and then delete 
export function getConfig(id: number | undefined, key: keyof DomElementConfig, defaultValue: unknown) {
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

export function getElement(id: number | undefined): {key: number, element: DomElement}|undefined {

  elementsStore.dom.children.forEach((element, key) => {
    if (element.id === id) {
        return {
          element,
          key,
        }
      }
  });

  return undefined;
}
