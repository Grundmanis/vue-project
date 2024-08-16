import { type Component } from 'vue'
import type { DomElement } from './DomElement'
import type { ElementData } from './ElementData'

export interface ElementsStore {
  showGrid: boolean
  incrementedId: number
  dom: {
    id: number
    type: Component
  }
  elements: DomElement[]
  history: DomElement[]
  lastHistoryIndex: number
  getElementData(id: number): ElementData | undefined
  getElementConfig(id: number, key: string): any // TODO: remove any
  saveElements(): any // TODO: remove any
  addElement(component: unknown): any,
  updateHistory(): void
  parseStringElements(): void
}
