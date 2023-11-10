import { type Component } from 'vue'
import type { DomElementConfig } from './DomElementConfig'
import type { DomElementStyles } from './DomElementStyles'

export interface DomElement {
  id: number
  parentId: number
  type: Component
  config: DomElementConfig
  styles: DomElementStyles
}
