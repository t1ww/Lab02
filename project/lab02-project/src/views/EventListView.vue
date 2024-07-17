<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/type'
import { ref, onMounted, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios'

const events = ref<Event[]>([])
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(2, props.page)
      .then((response: AxiosResponse<Event[]>) => {
        events.value = response.data
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Event for good</h1>
  <!--new element-->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <EventInfo v-for="event in events" :key="event.id" :event="event"></EventInfo>
    <RouterLink
      :to="{ name: 'event-list-view', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
    >
      Prev Page</RouterLink
    >
    <RouterLink
      :to="{ name: 'event-list-view', query: { page: page + 1 } }"
      rel="next"
      v-if="page < 5"
    >
      Next Page</RouterLink
    >
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
