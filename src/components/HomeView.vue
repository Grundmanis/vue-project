<script setup lang="ts">
import axios from 'axios';
import router from '../router'
</script>

<script lang="ts">
  export default {
    async beforeMount() {
      await this.getTemplates();
    },
    methods: {
      async getTemplates() {
        const response = await axios.get('http://localhost:8000/templates');
        this.templates = response.data;
      },
      async createTemplate() {
        const response = await axios.post('http://localhost:8000/templates');
        router.push(`/${response.data.url}`)
      },
    },
    
    data() {
      return {
        templates: []
      }
    }
  }
</script>

<template>
  <div>
    <h1>Welcome!</h1>
    <p>
      <strong>Your projects:</strong>
      <button v-on:click="createTemplate">Create new</button>
    </p>
    <ul>
      <li v-for="(template, key, index) in templates" :key="index" >
        <RouterLink :to="template.url" >{{template.url}}</RouterLink>
      </li>
    </ul>
  </div>
</template>

