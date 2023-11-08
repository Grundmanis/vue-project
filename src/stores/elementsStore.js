import { reactive } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'

export const elementsStore = reactive({
  dom: {
    id: 1,
    type: WrapperElement,
    children: [
      //   {
      //   id: 2,
      //   parentId: 1,
      //   type: Box,
      // },
      // {
      //   id: 3,
      //   parentId: 1,
      //   type: Box,
      // },
      // {
      //   id: 4,
      //   parentId: 1,
      //   type: Box,
      // },
      // {
      //   id: 5,
      //   parentId: 4,
      //   type: Box,
      // }
    ]
  },
  showGrid: true,
  incrementedId: 1
})
