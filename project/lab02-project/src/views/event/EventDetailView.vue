<script setup lang="ts">
import type { Event } from '@/type'
import type { PropType } from 'vue'
defineProps({
  event: {
    type: Object as PropType<Event>,
    require: true
  }
})
</script>
<template>
  <div v-if="event">
    <p>{{ event.title }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
