import apiClient from './AxiosClient'
import type { Event } from '@/types'

export default {
    getEvents(perPage: Number, page: Number) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent(id: number) {
      return apiClient.get('/events/' + id)
    },
    saveEvent(event: Event) {
        return apiClient.post('/events', event)
    },
    getEventsByKeyword(keyword: string, perPage: number, page: number):
        Promise<AxiosResponse<Event[]>> {
            return apiClient.get<Event[]>('/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
        }
}