import { reactive } from 'vue'
import type { DomElementConfig, DomElementStyles } from './elementsStore'

export interface ActiveStore {
  active: number,
  updatedStyles: DomElementStyles,
  config: DomElementConfig,
}

export const activeStore: ActiveStore = reactive({
  active: 1,
  updatedStyles: {},
  config: {}
})

// watch(activeStore, (newStore) => {
//     for (const key in elementsStore.dom.children) {
//       const element = elementsStore.dom.children[key];
//       if (element.id === newStore.active) {
//         console.log("found element", element);
//         // elementsStore.dom.children[key].
//       }
//     }

// })
