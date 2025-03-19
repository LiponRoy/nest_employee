import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<{ id: number; name: string }[], void>({
			query: () => 'users',
			providesTags: ['User'], // Cache tag
			
		}),
		createUser: builder.mutation<
			{ id: number; name: string },
			{ name: string }
		>({
			query: (userData) => ({
				url: 'users',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['User'], // Refresh cache after mutation
		}),
	}),
});

// Export hooks
export const { useGetUsersQuery, useCreateUserMutation } = userApi;
