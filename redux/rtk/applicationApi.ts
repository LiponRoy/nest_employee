import { baseApi } from "./baseApi";

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
        method: "POST",
      }),
      invalidatesTags: (result, error,jobId ) => [{ type: 'Application', id: jobId }],

    }),
    appliedJobsByUser: builder.query<any, void>({
      query: () => "/application/appliedJobsAll",
      // providesTags: ["Application"],
      providesTags: (result, error) => [{ type: 'Application'}],

    }),

    getApplicantsByJobId: builder.query<any, string>({
      query: (jobId) => `application/getApplicantsByJobId/${jobId}`,
      // providesTags: ["Application"],
      providesTags: (result, error, jobId) => [{ type: 'Application', id: jobId }],
    }),

    getIsApplied: builder.query<{ applied: boolean }, string>({
      query: (jobId) => `application/is-applied/${jobId}`,
      // providesTags: ["Application"],
      providesTags: (result, error, jobId) => [{ type: 'Application', id: jobId }],

    }),

    // applicationApi.ts
    acceptApplicant: builder.mutation<
      { success: boolean; message: string }, // expected response
      { jobSeeker_id: string; jobId: string } // input args
    >({
      query: ({ jobSeeker_id, jobId }) => ({
        url: `application/accept/${jobSeeker_id}/${jobId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { jobId }) => [{ type: 'Application', id: jobId }],
    }),

    rejectApplicant: builder.mutation<
      { success: boolean; message: string }, // expected response
      { jobSeeker_id: string; jobId: string } // input args
    >({
      query: ({ jobSeeker_id, jobId }) => ({
        url: `application/reject/${jobSeeker_id}/${jobId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { jobId }) => [{ type: 'Application', id: jobId }],
    }),
  }),
});

// Export hooks
export const {
  useApplyForJobMutation,
  useAppliedJobsByUserQuery,
  useGetApplicantsByJobIdQuery,
  useGetIsAppliedQuery,
  useAcceptApplicantMutation,
  useRejectApplicantMutation,
} = applicationApi;
