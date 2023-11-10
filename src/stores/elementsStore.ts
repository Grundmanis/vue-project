import { reactive, shallowRef } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'
import type { ElementsStore } from '@/interfaces/ElementStore'
import type { ElementData } from '@/interfaces/ElementData'

export const elementsStore: ElementsStore = reactive({
  dom: {
    id: 1,
    type: shallowRef(WrapperElement)
  },
  elements: [],
  showGrid: true,
  incrementedId: 1,
  getElementData: (id: number): ElementData | undefined => {
    let elementData
    elementsStore.elements.forEach((element, index) => {
      if (element.id === id) {
        elementData = {
          element,
          index
        }
        return
      }
    })

    return elementData
  }
})
