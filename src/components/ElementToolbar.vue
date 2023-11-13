<script setup lang="ts">
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { elementsStore } from '../stores/elementsStore'
</script>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<template>
  <div class="b-actions-toolbar">
    <span>#{{ id }}</span>
    <button
      v-if="id !== elementsStore.dom.id"
      title="Remove"
      class="b-action-remove"
      v-on:click="$emit('onRemove')"
    >
      <TrashIcon />
    </button>
    <button
      v-if="id !== elementsStore.dom.id"
      title="Duplicate"
      class="b-action-duplicate"
      v-on:click="$emit('onDuplicate')"
    >
      <DocumentDuplicateIcon />
    </button>
    <!-- <button title="Drag" class="b-action-drag">
        <ArrowsPointingOutIcon />
      </button> -->
  </div>
</template>
