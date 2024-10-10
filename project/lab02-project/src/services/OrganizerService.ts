import type { AxiosResponse } from 'axios';
import {type Organizer } from './../types';
import apiClient from './AxiosClient'

export default {
    getOrganizers() {
        return apiClient.get('/organizers')
    },
    getOrganizer(id: number) {
      return apiClient.get('/organizers/' + id)
    },
    saveOrganizer(organizer: Organizer) {
        return apiClient.post('/organizers', organizer)
    },
    getOrganizersByKeyword(keyword: string, perPage: number, page: number):
        Promise<AxiosResponse<Organizer[]>> {
            return apiClient.get<Organizer[]>('/organizers?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
        }}