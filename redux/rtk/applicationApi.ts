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
    }),
    appliedJobsByUser: builder.query<any, void>({
      query: () => "/application/appliedJobsAll",
      providesTags: ["Application"],
    }),

    getApplicantsByJobId: builder.query<any, string>({
      query: (id) => `application/getApplicantsByJobId/${id}`,
    }),

    getIsApplied: builder.query<{ applied: boolean }, string>({
      query: (jobId) => `/application/is-applied/${jobId}`,
    }),

    // applicationApi.ts
    rejectApplicant: builder.mutation<
      { success: boolean; message: string }, // expected response
      { jobSeeker_id: string; jobId: string } // input args
    >({
      query: ({ jobSeeker_id, jobId }) => ({
        url: `application/reject/${jobSeeker_id}/${jobId}`,
        method: "PATCH",
      }),
    }),
  }),
});

// Export hooks
export const {
  useApplyForJobMutation,
  useAppliedJobsByUserQuery,
  useGetApplicantsByJobIdQuery,
  useGetIsAppliedQuery,
  useRejectApplicantMutation,
} = applicationApi;
