import { baseApi } from './baseApi';

export const jobApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getJobs: builder.query<{ id: number; title: string }[], void>({
			query: () => '/job/all',
			providesTags: ['Job'],
		}),
		getJobsByFilter: builder.query({
			query: ({
				page,
				limit,
				search = '',
				searchValue='',
				categoryFilter,
				jobType,
				gender,
			}) => {
				// Build the query parameters dynamically
				const params = new URLSearchParams();

				if (page) params.append('page', page);
				if (limit) params.append('limit', limit);
				if (search) params.append('searchTerm', search);
				if (searchValue) params.append('searchTerm', searchValue);
				// if (categoryFilter) params.append('category', categoryFilter);
				categoryFilter.forEach((d: any) => params.append('category', d));
				jobType.forEach((d: any) => params.append('jobType', d));
				gender.forEach((d: any) => params.append('gender', d));

				return {
					url: `/job/all/?${params.toString()}`,
					method: 'GET',
				};
			},
			keepUnusedDataFor: 0, // Don't keep the data in cache
		}),
		createJobs: builder.mutation({
			query: (formData: FormData) => ({
				url: 'job/create',
				method: 'POST',
				body: formData,
			}),
		}),
		getJobByCreator: builder.query<any, void>({
			query: () => '/job/getJobByCreator',
			providesTags: ['Company'],
		}),
		getJobById: builder.query<any, string>({
			query: (id) => `job/${id}`,
		}),
	}),
});

// Export hooks
export const {
	useGetJobsQuery,
	useCreateJobsMutation,
	useGetJobByCreatorQuery,
	useGetJobByIdQuery,
	useGetJobsByFilterQuery,
} = jobApi;
