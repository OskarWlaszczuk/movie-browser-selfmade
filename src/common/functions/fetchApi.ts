import { fetchFromAPI } from "./fetchFromAPI";

interface FetchApiProps {
    endpoint: string;
    fetchDelayInSec?: number;
}

export const fetchApi = <ResponseType>({ fetchDelayInSec, endpoint }: FetchApiProps) => (
    new Promise<ResponseType>((resolve, reject) => {
        setTimeout(async () => {
            try {
                const result = await fetchFromAPI<ResponseType>(endpoint);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        }, fetchDelayInSec || 0 * 1000);
    })
);