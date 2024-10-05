<script setup lang="ts">
import type { Event } from '@/types';
import { onMounted, ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import OrganizerService from '@/services/OrganizerService';
import BaseSelect from '@/components/BaseSelect.vue'

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
    id: 0,
    name: ''
  },
  participant: {
    id: 0,
    name: '',
    telNo: ''
  }
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

const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error-view' })
  })
})
</script>

<template>
    <div>
      <h1>Create an Event</h1>
      <form @submit.prevent="saveEvent">
        <!-- <label>Category</label>
        <input v-model="event.category" type="text" placeholder="Category"
        class="field"/> -->
        <BaseInput v-model="event.category" type="text" label="Category" />
        
        <h3>Name & describe your event</h3>
        <!-- <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Title" class="field"/> -->
        <BaseInput v-model="event.title" type="text" label="Title" />

        <BaseInput v-model="event.description" type="text" label="Description" />
  
        <h3>Where is your event?</h3>
        <BaseInput v-model="event.location" type="text" label="Location" />
  
        <h3>Who is your organizer?</h3>
        <label>Select an Organizer</label>
        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />
        <button class="button" type="submit">Submit</button>
      </form>
      <pre>{{ event }}</pre>
    </div>
  </template>

<<<<<<< HEAD
=======
<style lang="css">
  /* write css for me */
  /* General container styles */
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1, h3 {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

/* BaseInput and form elements */
.field, .base-input input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.base-input label {
  font-weight: bold;
  margin-bottom: 5px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

/* BaseSelect and select elements */
.base-select select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

/* Styling the <pre> element */
pre {
  background-color: #e8e8e8;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  overflow: auto;
  margin-top: 20px;
}

</style>
>>>>>>> parent of 4418469 (lab 10 q2)
