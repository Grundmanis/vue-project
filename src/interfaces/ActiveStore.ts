import type { DomElementConfig } from '@/interfaces/DomElementConfig'
import type { DomElementStyles } from '@/interfaces/DomElementStyles'

export interface ActiveStore {
  active: number
  updatedStyles: DomElementStyles
  config: DomElementConfig
}
