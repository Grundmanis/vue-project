export interface ListElement {
  text: string
}

export interface DomElementConfig {
  text?: string
  tag?: string
  src?: string,
  type?: string,
  list?: ListElement[]
}
