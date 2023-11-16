<script setup lang="ts">
import ElementTemplate from './ElementTemplate.vue'
import { elementsStore } from '../../stores/elementsStore'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      props: {
        id: this.id,
        className: 'b-nav',
        tag: 'nav',
        styles: {
          padding: '0 30px',
          color: '#fff',
          backgroundColor: '#333',
          display: 'flex',
          flexRow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        config: {
          list: [
            {
              text: 'Home'
            },
            {
              text: 'About'
            },
            {
              text: 'Price'
            },
            {
              text: 'Contacts'
            }
          ],
          children: {
            a: {
              styles: {
                display: 'block',
                color: 'white',
                textAlign: 'center',
                padding: '14px 16px',
                textDecoration: 'none',
                fontSize: '14px'
              }
            },
            img: {
              styles: {
                height: '50px',
                display: 'block',
              }
            },
            brand: {
              styles: {
                color: '#fff',
                display: 'block',
                textDecoration: 'none',
                marginRight: '20px',
                fontSize: '18px',
              }
            },
            list: {
              styles: {
                display: 'inline-block',
              }
            },
            ul: {
              styles: {
                marginRight: 'auto',
                padding: 0,
              }
            },
          }
        }
      }
    }
  }
}

// Pass the ImageComponent instead of img tag
// Pass the TextComponent instead of some data here
// Create the LinkComponent and pass it instead of a tag
// Update the list component - add the URL feature, and then pass it instead of a ul > li
</script>

<template>
  <ElementTemplate v-bind="props">
      <a :style="elementsStore.getElementConfig(id, 'children')['brand']?.styles" class="b-nav-brand" href="#">
        <img :style="elementsStore.getElementConfig(id, 'children')['img']?.styles" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png" alt="lego">
      </a>
      <ul :style="elementsStore.getElementConfig(id, 'children')['ul']?.styles">
        <li :style="elementsStore.getElementConfig(id, 'children')['list']?.styles" :key="index" v-for="(listElement, index) in elementsStore.getElementConfig(id, 'list')">
          <a href="#" :style="elementsStore.getElementConfig(id, 'children')['a']?.styles">
            {{ listElement.text }}
          </a>
        </li>
      </ul>
      <div>
        some data here
      </div>
  </ElementTemplate>
</template>
