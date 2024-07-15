import axios from 'axios';

export const getIdFromUrl = (url: string) => {
    const joinedNumber = url.match(/\d+/)?.[0] ?? null;
    return joinedNumber ? Number(joinedNumber) : null;
};

export const fetchMultipleDetails = async (urls: string[]) => {
    try {
      const requests = urls.map(url => axios.get(url));
      const responses = await Promise.all(requests);
      return responses.map(response => response.data);
    } catch (error) {
      console.error("Failed to fetch details", error);
      throw error;
    }
};