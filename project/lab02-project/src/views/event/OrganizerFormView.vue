<script setup lang="ts">
import type { Organizer } from '@/types';
import { ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';

import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  address: '',
  image: ''
});

const router = useRouter();
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      
      store.updateMessage('You are successfully add a new oragnization for ' + 
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
      <form @submit.prevent="saveOrganizer">
        <label>oragnization name</label>
        <input v-model="organizer.name" type="text" placeholder="Category"
        class="field"/>
        
        <h3>Address</h3>
        <label>Title</label>
        <input v-model="organizer.address" type="text" placeholder="Title" class="field"/>

        <h3>The image of the organizer</h3>
        <ImageUpload v-model="organizer.image" />
  
        <button class="button" type="submit">Submit</button>
      </form>
      
    </div>
  </template>

<style scoped src="@/assets/form-style.css"></style>