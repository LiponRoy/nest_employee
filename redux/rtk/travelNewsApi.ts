import { baseApi } from './baseApi';

const travelNewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTravelNews: build.query({
      query: ({ page,
        limit,service = '',destination = ''}) => {
        // Build the query parameters dynamically
        const params = new URLSearchParams();

        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        if (service) params.append('service', service);
        if (destination) params.append('destination', destination);
        
        return {
          url: `/travelNews/all?${params.toString()}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 0, // Don't keep the data in cache
    }),
   
  }),
  
});

export const { useGetAllTravelNewsQuery } = travelNewsApi;
