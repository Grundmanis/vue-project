import { reactive, shallowRef, type Component } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'

export interface DomElementConfig {
  text?: string,
  tag?: string,
}

export interface DomElementStyles {
  [k: string]: string,
} 

export interface DomElement {
    id: number,
    parentId: number,
    type: Component,
    config: DomElementConfig,
    styles: DomElementStyles,
}

export interface ElementsStore {
  showGrid: boolean,
  incrementedId: number,
  dom: {
    id: number,
    type: Component,
    children: DomElement[],
  }
}

export const elementsStore: ElementsStore = reactive({
  dom: {
    id: 1,
    type: shallowRef(WrapperElement),
    children: []
  },
  showGrid: true,
  incrementedId: 1,
})
