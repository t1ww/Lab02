<script setup lang="ts">
import type { Event } from '@/types';
import type { Organizer } from '@/types';
import { ref } from 'vue';
import EventService from '@/services/EventService';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router';

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: '',
});

const organizer = ref<Organizer>({
  id: 0,
  organizationName: '',
  address: ''
});

const isSubmittingEvent = ref(true); // Controls form mode: event or organizer
const router = useRouter();

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } });
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      //store.updateMessage('Organizer ' + response.data.organizationName + ' has been updated.'); // Update message with the organizer's name
      //setTimeout(() => {
      //  store.resetMessage(); // Reset the message after 3 seconds
        router.go(0); // Refresh the current page
      //}, 3000);
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}



function submitForm() {
  if (isSubmittingEvent.value) {
    saveEvent();
  } else {
    saveOrganizer();
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ isSubmittingEvent ? 'Create an Event' : 'Create an Organizer' }}</h1>

    <!-- Dropdown to select between Event and Organizer -->
    <label for="submission-type">Select Type</label>
    <select id="submission-type" v-model="isSubmittingEvent" class="field">
      <option :value="true">Event</option>
      <option :value="false">Organizer</option>
    </select>

    <!-- Form submission -->
    <form @submit.prevent="submitForm">
      <!-- Fields common to both Event and Organizer -->
      <label v-if="isSubmittingEvent">Category</label>
      <input v-if="isSubmittingEvent" v-model="event.category" type="text" placeholder="Category" class="field" />

      <label v-if="isSubmittingEvent">Title</label>
      <input v-if="isSubmittingEvent" v-model="event.title" type="text" placeholder="Title" class="field" />

      <label v-if="isSubmittingEvent">Description</label>
      <input v-if="isSubmittingEvent" v-model="event.description" type="text" placeholder="Description" class="field" />

      <!-- Fields specific to Event submission -->
      <div v-if="isSubmittingEvent">
        <h3>Where is your event?</h3>
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Location" class="field" />
      </div>

      <!-- Fields specific to Organizer submission -->
      <div v-else>
        <h3>Organizer Information</h3>
        <label>Organization Name</label>
        <input v-model="organizer.organizationName" type="text" placeholder="Organization Name" class="field" />

        <label>Address</label>
        <input v-model="organizer.address" type="text" placeholder="Address" class="field" />
      </div>

      <button class="button" type="submit">{{ isSubmittingEvent ? 'Submit Event' : 'Submit Organizer' }}</button>
    </form>

    <pre>{{ isSubmittingEvent ? event : organizer }}</pre>
  </div>
</template>

<style scoped>
/* Same styling */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
}

h3 {
  margin-top: 20px;
  color: #555;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.field:focus {
  border-color: #007bff;
  outline: none;
}

.button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

pre {
  margin-top: 20px;
  background: #e7e7e7;
  padding: 10px;
  border-radius: 4px;
  text-align: left;
}
</style>
