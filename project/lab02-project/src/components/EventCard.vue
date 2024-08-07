<script setup lang="ts">
import type { Event } from '@/type'
defineProps<{
  event: Event
}>()
// const event = ref({
//   id: 5928101,
//   category: 'animal welfare',
//   title: 'Cat Adoption Day',
//   description: 'Find your new feline friend at this event.',
//   location: 'Meow Town',
//   date: 'January 28, 2022',
//   time: '12:00',
//   petsAllowed: true,
//   organizer: 'Kat Laydee'
// })
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: event?.id } }">
    <div class="event-class">
      <div
        class="cursor-pointer border border-gray-600 p-4 w-64 mb-6 hover:scale-105 hover:shadow-sp"
      >
        <h2>{{ event?.title }}</h2>
        <span>@{{ event?.time }} on {{ event?.date }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-link {
  color: #0d3358;
  text-decoration: none;
}
</style>
