import { reactive, shallowRef } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'
import type { ElementsStore } from '@/interfaces/ElementStore'
import type { ElementData } from '@/interfaces/ElementData'
import type { DomElementConfig } from '@/interfaces/DomElementConfig'

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
  },
  getElementConfig(id: number, key: keyof DomElementConfig) {
      const elementData = this.getElementData(id);
      if (!elementData) {
        return {}
      }

      return elementData.element.config[key];
  },
})
