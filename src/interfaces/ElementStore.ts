import { type Component } from 'vue'
import type { DomElement } from './DomElement'

export interface ElementsStore {
  showGrid: boolean
  incrementedId: number
  dom: {
    id: number
    type: Component
    children: DomElement[]
  }
}
