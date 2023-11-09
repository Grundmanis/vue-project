import { computed, type ComputedRef } from 'vue'
// @ts-ignore
import { activeStore } from '../stores/activeStore.js'
// @ts-ignore
import { elementsStore } from '../stores/elementsStore.js'

// by convention, composable function names start with "use"
export function updatedConfig(id: number|undefined): ComputedRef<{tag: string, text: string}> {
    return computed<{tag: string, text: string}>(() => {
        const elementData = getElement(id)
        if (!elementData) {
            console.error('no element data on updatedStyles')
            return false;
        }

        if (activeStore.active === id && Object.keys(activeStore.config).length) {
            elementsStore.dom.children[elementData.key].config = activeStore.config
            return activeStore.config
        }

        return elementsStore.dom.children[elementData.key].config
    });
}

export function getElement(id: number|undefined) {
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