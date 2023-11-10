import { reactive, shallowRef } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'
import type { ElementsStore } from '@/interfaces/ElementStore'
import type { ElementData } from '@/interfaces/ElementData';

export const elementsStore: ElementsStore = reactive({
  dom: {
    id: 1,
    type: shallowRef(WrapperElement),
    children: []
  },
  showGrid: true,
  incrementedId: 1,
  getElement: (id: number): ElementData | undefined => {
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
})
