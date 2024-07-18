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
  <p>Register from here</p>
</template>
