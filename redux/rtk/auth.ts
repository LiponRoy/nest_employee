import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['Auth'],
		}),
		signup: builder.mutation({
			query: (userData) => ({
				url: '/auth/signup',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['Auth'],
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: ['Auth'],
		}),
		getProfile: builder.query({
			query: () => '/auth/profile',
			providesTags: ['Auth'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useGetProfileQuery,
} = authApi;
