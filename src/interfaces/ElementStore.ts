import { type Component } from 'vue'
import type { DomElement } from './DomElement'
import type { ElementData } from './ElementData'

export interface ElementsStore {
  showGrid: boolean
  incrementedId: number
  dom: {
    id: number
    type: Component
    children: DomElement[]
  },
  getElement(id: number) : ElementData | undefined
}
