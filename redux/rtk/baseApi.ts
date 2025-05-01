import { getBaseUrl } from '@/helpers/config/envConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: getBaseUrl(),
		//For cookies
		credentials: 'include',
		// prepareHeaders: (headers) => {
		// 	headers.set('Content-Type', 'application/json');
		// 	return headers;
		// },
		prepareHeaders: (headers, { getState, endpoint }) => {
			// Don't set Content-Type here, let it be handled automatically
			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ['Auth', 'Job', 'Company', 'Application'],
});
