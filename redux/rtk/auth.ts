import { baseApi } from './baseApi';
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		signup: builder.mutation({
			query: (userData) => ({
				url: '/auth/signup',
				method: 'POST',
				body: userData,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
		}),
		getProfile: builder.query({
			query: () => '/auth/profile',
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useGetProfileQuery,
} = authApi;
