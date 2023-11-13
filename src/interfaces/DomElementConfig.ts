import type { DomElementStyles } from './DomElementStyles'

export interface DomElementConfig {
  text?: string
  tag?: string
  src?: string
  type?: string
  list?: { text: string }[]
  children?: {
    [s: string]: {
      styles: DomElementStyles
    }
  }
  // styles?: DomElementStyles
}
