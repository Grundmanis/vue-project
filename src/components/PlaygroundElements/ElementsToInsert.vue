<script setup lang="ts">
import { elementsStore } from '../../stores/elementsStore'
import TextElement from '../BuildElements/TextElement.vue'
import HeadingElement from '../BuildElements/HeadingElement.vue'
import BoxElement from '../BuildElements/BoxElement.vue'
import RowElement from '../BuildElements/RowElement.vue'
import ColumnElement from '../BuildElements/ColumnElement.vue'
// import ImageElement from './BuildElements/ImageElement.vue'
// import ListElement from './BuildElements/ListElement.vue'
// import Navbar from './BuildElements/Navbar.vue'
// import InputElement from './BuildElements/InputElement.vue'
// import ButtonElement from './BuildElements/ButtonElement.vue'
// import TestElement from './BuildElements/TestElement.vue'
</script>

<script lang="ts">
export default {
  methods: {
  }
}
</script>

<template>
  <ul>
    <li>
      <button id="b-add-box" v-on:click="elementsStore.addElement(BoxElement)">Box</button>
    </li>
    <li>
      <button id="b-add-box" v-on:click="elementsStore.addElement(RowElement)">Row</button>
    </li>
    <li>
      <button id="b-add-box" v-on:click="elementsStore.addElement(ColumnElement)">Column</button>
    </li>
    <li>
      <button id="b-add-text" v-on:click="elementsStore.addElement(HeadingElement)">Heading</button>
    </li>
    <li>
      <button id="b-add-text" v-on:click="elementsStore.addElement(TextElement)">Rich text</button>
    </li>
    <!-- <li>
      <button id="b-add-image" v-on:click="elementsStore.addElement(ImageElement)">Image</button>
    </li>
    <li>
      <button id="b-add-list" v-on:click="elementsStore.addElement(ListElement)">List</button>
    </li>
    <li>
      <button id="b-add-horizontal-menu" v-on:click="elementsStore.addElement(Navbar)">
        Navbar
      </button>
    </li>
    <li>
      <button id="b-add-input" v-on:click="elementsStore.addElement(InputElement)">
        Input
      </button>
    </li>
    <li>
      <button id="b-add-button" v-on:click="elementsStore.addElement(ButtonElement)">
        Button
      </button>
    </li>
    <li>
      <button id="b-add-button" v-on:click="elementsStore.addElement(TestElement)">
        Test ELement
      </button>
    </li> -->
  </ul>
</template>
