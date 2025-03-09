import { getBaseUrl } from '@/helpers/config/envConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API with default settings
export const baseApi = createApi({
	reducerPath: 'api', // Unique key for the API slice
	baseQuery: fetchBaseQuery({
		baseUrl: getBaseUrl(), // getting backend base URL
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: () => ({}), // Empty, will be extended
	tagTypes: ['User', 'Post'], // Define tag types for cache management
});
