import { baseApi } from './baseApi';

export const CompanyApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createCompany: builder.mutation({
			query: (formData: FormData) => ({
				url: 'company/create',
				method: 'POST',
				body: formData,
			}),
		}),
		getCompanyByCreator: builder.query<any, void>({
			query: () => '/company/getCompanyByCreator',
			providesTags: ['Company'],
		}),
		getCompanyNamesByCreator: builder.query<any, void>({
			query: () => '/company/compnyNames',
			providesTags: ['Company'],
		}),
	}),
});

// Export hooks
export const {
	useCreateCompanyMutation,
	useGetCompanyByCreatorQuery,
	useGetCompanyNamesByCreatorQuery,
} = CompanyApi;
