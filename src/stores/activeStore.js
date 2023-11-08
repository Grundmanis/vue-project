import { reactive, watch } from 'vue'
import { elementsStore } from './elementsStore.js'

export const activeStore = reactive({
  active: 1,
  updatedStyles: {},
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