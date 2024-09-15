import axios, { type AxiosResponse } from 'axios'
import type { Event } from '@/type'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(pageLimit: number[], page: number): Promise<AxiosResponse<Event[]>> {
    // Validate page number
    if (page <= 0 || page > pageLimit.length) {
      throw new Error(`Invalid page number ${page}.`)
    }

    // Calculate start index based on valid page and pageLimit
    let startIndex = 0
    for (let i = 1; i < page; i++) {
      // Start loop from 1 to skip index 0
      startIndex += pageLimit[i]
    }
    const limit = pageLimit[page]

    // Prepare query parameters for pagination
    const params = {
      _start: startIndex,
      _limit: limit
    }

    return apiClient.get<Event[]>('/events', { params })
  },

  getEventById(id: number): Promise<AxiosResponse<Event>> {
    return apiClient.get<Event>(`/events/${id}`)
  },
  
  saveEvent(event: Event){
    return apiClient.post('/events', event)
  }
}
