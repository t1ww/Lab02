<script setup lang="ts">
import type { Event } from '@/type';
import { ref } from 'vue';
import EventService from '@/services/EventService';
import BaseInput from '@/components/BaseInput.vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id:0,
    name:''
  },
});

const router = useRouter();
const store = useMessageStore()

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } });
      store.updateMessage('You are successfully add a new event for ' + 
      response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}
</script>

<template>
    <div>
      <h1>Create an Event</h1>
      <form @submit.prevent="saveEvent">
        <BaseInput v-model="event.category" type="text" label="Category"/>

        
        <h3>Name & describe your event</h3>
       <BaseInput v-model ="event.title" type="text" label="Title" />
  
        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Description" 
        class="field"/> 
  
        <h3>Where is your event?</h3>
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Location" 
        class="field"/>
  
        <button class="button" type="submit">Submit</button>
      </form>
      <pre>{{ event }}</pre>
    </div>
  </template>