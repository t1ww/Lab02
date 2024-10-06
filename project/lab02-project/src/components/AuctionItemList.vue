<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const auctionItems = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/auction-items'); // Adjust the endpoint as needed
    auctionItems.value = response.data;
  } catch (error) {
    console.error('Error fetching auction items:', error);
  }
});
</script>

<template>
    <div>
      <h1>Auction Items</h1>
      <ul>
        <li v-for="item in auctionItems" :key="item.id">
          <h2>{{}}</h2>
          <p>{{}}</p>
          <p v-if="item">winning bid : {{  }}</p>
        </li>
      </ul>
    </div>
  </template>