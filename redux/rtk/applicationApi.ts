import { baseApi } from './baseApi';

export const applicationApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// applyForJob: builder.mutation({
		// 	query: (jobId) => `/application/create/${jobId}`,

		// 	// query: (formData: FormData) => ({
		// 	// 	url: 'job/create',
		// 	// 	method: 'POST',
		// 	// 	body: formData,
		// 	// }),
		// }),
		applyForJob: builder.mutation({
			query: (jobId: string) => ({
				url: `application/create/${jobId}`,
				method: 'POST',
			}),
		}),
	}),
});

// Export hooks
export const { useApplyForJobMutation } = applicationApi;
