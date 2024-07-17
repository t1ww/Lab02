import axios, { type AxiosResponse } from 'axios'
import type { Event } from '@/type'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/t1ww/lab02-mock-server/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage: number, page:number): Promise<AxiosResponse<Event[]>> {
        return apiClient.get<Event[]>('/events?limit' + perPage + '&_page' + page)
    },
    getEventById(id: number): Promise<AxiosResponse<Event>>{
        return apiClient.get<Event>('events/' + id.toString())
    }
}