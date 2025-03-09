import { baseApi } from './baseApi';

export const postApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query<{ id: number; title: string }[], void>({
			query: () => 'posts',
			providesTags: ['Post'],
		}),
		createPost: builder.mutation<
			{ id: number; title: string },
			{ title: string }
		>({
			query: (postData) => ({
				url: 'posts',
				method: 'POST',
				body: postData,
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

// Export hooks
export const { useGetPostsQuery, useCreatePostMutation } = postApi;
