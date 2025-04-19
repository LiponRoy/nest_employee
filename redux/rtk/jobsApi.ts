import { baseApi } from './baseApi';

export const jobApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getJobs: builder.query<{ id: number; title: string }[], void>({
			query: () => '/job/all',
			providesTags: ['Job'],
		}),
		createJobs: builder.mutation<
			{ id: number; title: string },
			{ title: string }
		>({
			query: (postData) => ({
				url: 'job/create',
				method: 'POST',
				body: postData,
			}),
			invalidatesTags: ['Job'],
		}),
		getJobByCreator: builder.query<any, void>({
			query: () => '/job/getJobByCreator',
			providesTags: ['Company'],
		}),
	}),
});

// Export hooks
export const {
	useGetJobsQuery,
	useCreateJobsMutation,
	useGetJobByCreatorQuery,
} = jobApi;
