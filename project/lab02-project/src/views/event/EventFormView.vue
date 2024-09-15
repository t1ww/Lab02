<script setup lang="ts">
import type { Event } from '@/types';
import { ref } from 'vue';

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
</script>

<template>
  <div class="container">
    <h1>Create an Event</h1>
    <form @submit.prevent>
      <label>Category</label>
      <input v-model="event.category" type="text" placeholder="Category" class="field" />

      <h3>Name & describe your event</h3>
      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" class="field" />

      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Description" class="field" />

      <h3>Where is your event?</h3>
      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" class="field" />

      <button class="button" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
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
