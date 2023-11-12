import type { DomElementStyles } from "./DomElementStyles"

export interface ListElement {
  text: string
}

export interface DomElementConfig {
  text?: string
  tag?: string
  src?: string,
  type?: string,
  list?: ListElement[]
  children: {
    [s: string]: {
      styles: DomElementStyles,
    }
  }
  styles?: DomElementStyles
}
