<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/type'
import { ref, onMounted, watchEffect, computed } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios'

const events = ref<Event[]>([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageLimit: {
    type: Array<number>,
    required: true
  }
})
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(props.pageLimit, props.page)
      .then((response: AxiosResponse<Event[]>) => {
        events.value = response.data
        totalEvent.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
const hasNextPage = computed(() => {
  // calculate total page
  const totalPages = props.pageLimit.length - 1
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Event for good</h1>
  <!--new element-->
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <EventInfo v-for="event in events" :key="event.id" :event="event"></EventInfo>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
