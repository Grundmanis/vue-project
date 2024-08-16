import { reactive, shallowRef } from 'vue'
import WrapperElement from '../components/BuildElements/WrapperElement.vue'
import type { ElementsStore } from '@/interfaces/ElementStore'
import type { ElementData } from '@/interfaces/ElementData'
import type { DomElementConfig } from '@/interfaces/DomElementConfig'
import axios from 'axios'
import router from '@/router'
import type { DomElement } from '@/interfaces/DomElement'
import { activeStore } from './activeStore'
import * as Obj from '../helpers/Obj'
import TextElement from '../components/BuildElements/TextElement.vue'
import BoxElement from '../components/BuildElements/BoxElement.vue'
import ImageElement from '../components/BuildElements/ImageElement.vue'
import ListElement from '../components/BuildElements/ListElement.vue'
import Navbar from '../components/BuildElements/Navbar.vue'
import InputElement from '../components/BuildElements/InputElement.vue'
import ButtonElement from '../components/BuildElements/ButtonElement.vue'

export const elementsStore: ElementsStore = reactive({
  dom: {
    id: 1,
    type: shallowRef(WrapperElement)
  },
  elements: [],
  history: [],
  lastHistoryIndex: 0,
  showGrid: true,
  incrementedId: 1,
  elementTypes: {
    'TextElement': TextElement,
    'BoxElement': BoxElement,
    'ImageElement': ImageElement,
    'ListElement': ListElement,
    'Navbar': Navbar,
    'InputElement': InputElement,
    'ButtonElement': ButtonElement,
  },
  defaultConfig: {
    name: "",
  },
  getElementData: (id: number): ElementData | undefined => {
    let elementData
    elementsStore.elements.forEach((element, index) => {
      if (element.id === id) {
        elementData = {
          element,
          index
        }
        return
      }
    })

    return elementData
  },
  updateHistory() {
    this.history.push(Obj.clone(this.elements));
    this.lastHistoryIndex = 0;
  },
  addElement(component: unknown) {
    this.updateHistory();
    elementsStore.incrementedId++
    const element: DomElement = {
      type: shallowRef(component),
      id: elementsStore.incrementedId,
      config: {},
      styles: {},
      parentId: activeStore.active
    }
    elementsStore.elements.push(element)
    // elementsStore.saveElements();
  },
  getElementConfig(id: number, key: keyof DomElementConfig) {
    const elementData = this.getElementData(id)
    if (!elementData) {
      return {}
    }

    return elementData.element.config[key]
  },
  async saveElements() {
    const str = JSON.stringify(this.elements);
    const url = router.currentRoute.value.params.code;
    await axios.put(`http://localhost:8000/templates/${url}`, {
      code: str
    })
  },
  parseStringElements(elements: string) {
    if (!elements) {
      return {};
    }
    let localIncrementedId = 0;
    let parsedElements = JSON.parse(elements);
    parsedElements = parsedElements.map(element => {
      if (element.id > localIncrementedId) {
        localIncrementedId = element.id;
      }
      return  {
        id: element.id,
        config: element.config,
        styles: element.styles,
        parentId: element.parentId,
        type: shallowRef(this.elementTypes[element.type.__name]),
      }
    })

    this.incrementedId = localIncrementedId;
    this.elements = parsedElements
    return parsedElements;
  }
})
