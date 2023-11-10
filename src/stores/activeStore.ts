import type { DomElementConfig } from '@/interfaces/DomElementConfig'
import type { DomElementStyles } from '@/interfaces/DomElementStyles'
import { reactive } from 'vue'

export interface ActiveStore {
  active: number
  updatedStyles: DomElementStyles
  config: DomElementConfig
}

export const activeStore: ActiveStore = reactive({
  active: 1,
  updatedStyles: {},
  config: {}
})
