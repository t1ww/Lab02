<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/type'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
const event = ref<Event | null>(null)
const props = defineProps({
  id: String
})
const router = useRouter()
EventService.getEventById(Number(props.id))
  .then((response) => {
    event.value = response.data
  })
  .catch((error) => {
    console.log(error)
    if (error.resource && error.response.status === 404) {
      router.push({ name: '404-resource', params: { resource: 'event' } })
    } else {
      router.push({ name: 'network-error' })
    }
  })
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'event-detail-view', params: { id } }">Details</RouterLink> |
      <RouterLink :to="{ name: 'event-register-view', params: { id } }">Register</RouterLink> |
      <RouterLink :to="{ name: 'event-edit-view', params: { id } }">Edit</RouterLink>
    </div>

    <RouterView :event="event"></RouterView>
  </div>
</template>
