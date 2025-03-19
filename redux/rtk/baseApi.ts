import { getBaseUrl } from '@/helpers/config/envConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API with default settings
export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/v1',
		// Important for cookies
		credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ['User', 'Job'],
});
