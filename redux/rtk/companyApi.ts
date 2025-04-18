import { baseApi } from './baseApi';

export const CompanyApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createCompany: builder.mutation<
			{ id: number; title: string },
			{ title: string }
		>({
			query: (postData) => ({
				url: 'company/create',
				method: 'POST',
				body: postData,
			}),
			invalidatesTags: ['Company'],
		}),
	}),
});

// Export hooks
export const { useCreateCompanyMutation } = CompanyApi;
