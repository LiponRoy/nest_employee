import {JobsResponse, JobsResponseSingle } from "@/constant/Constant";
import { baseApi } from "./baseApi";

// Common Job type
export interface Job {
  id: string;
  title: string;
  description?: string;
  category?: string;
  jobType?: string;
  gender?: string;
  division?: string;
  [key: string]: unknown; // fallback for extra fields
}

// Filter query type
export interface JobFilterParams {
  page?: string;
  limit?: string;
  search?: string;
  searchValue?: string;
  categoryFilter?: string[];
  jobType?: string[];
  gender?: string[];
  division?: string[];
}

// Response type for delete
export interface DeleteJobResponse {
  message: string;
}

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all jobs (basic list)
    getJobs: builder.query<JobsResponse, void>({
      query: () => "/job/all",
      providesTags: ["Job"],
    }),

    // Get jobs by filters
    getJobsByFilter: builder.query<JobsResponse, JobFilterParams>({
      query: ({
        page,
        limit,
        search = "",
        searchValue = "",
        categoryFilter = [],
        jobType = [],
        gender = [],
        division = [],
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("searchTerm", search);
        if (searchValue) params.append("searchTerm", searchValue);

        categoryFilter.forEach((d) => params.append("category", d));
        jobType.forEach((d) => params.append("jobType", d));
        gender.forEach((d) => params.append("gender", d));
        division.forEach((d) => params.append("division", d));

        return {
          url: `/job/all/?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: JobsResponse): JobsResponse => response,
      keepUnusedDataFor: 0,
      providesTags: ["Job"],
    }),

    // Create a job
    createJobs: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "job/create",
        method: "POST",
        body: formData,
      }),
    }),

    // Get job by creator
    getJobByCreator: builder.query<JobsResponse, void>({
      query: () => "/job/getJobByCreator",
      providesTags: ["Company"],
    }),

    // Get job by ID
    getJobById: builder.query<JobsResponseSingle, string>({
      query: (id) => `job/${id}`,
    }),

    // Delete job by ID
    deleteJobById: builder.mutation<DeleteJobResponse, string>({
      query: (jobId) => ({
        url: `/job/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
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
  useDeleteJobByIdMutation,
} = jobApi;
