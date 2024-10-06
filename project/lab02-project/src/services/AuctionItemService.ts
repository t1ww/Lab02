import { type AuctionItem } from './../types';
import axios, { type AxiosResponse } from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getAuctionItems(perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
        return apiClient.get<AuctionItem[]>(`/auctions?_limit=${perPage}&_page=${page}`);
    },

    getAuctionItem(id: number): Promise<AxiosResponse<AuctionItem>> {
        return apiClient.get<AuctionItem>(`/auctions/${id}`);  
    },
    
    searchAuctionItemsByDescription(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
        return apiClient.get<AuctionItem[]>(`/auctions?description=${keyword}&_limit=${perPage}&_page=${page}`);
    }
};
