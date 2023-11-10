import { reactive, shallowRef } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'
import type { ElementsStore } from '@/interfaces/ElementStore'

export const elementsStore: ElementsStore = reactive({
  dom: {
    id: 1,
    type: shallowRef(WrapperElement),
    children: []
  },
  showGrid: true,
  incrementedId: 1
})
