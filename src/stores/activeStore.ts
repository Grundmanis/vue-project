import type { ActiveStore } from '@/interfaces/ActiveStore'
import { reactive } from 'vue'

export const activeStore: ActiveStore = reactive({
  active: 1,
  updatedStyles: {},
  config: {},
})
