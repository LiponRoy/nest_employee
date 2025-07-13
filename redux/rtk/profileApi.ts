import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
     
        updateProfileGeneralInfo: builder.mutation({
            query: (formData: FormData) => ({
                url: "/profile/updateGeneralInfo",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error) => [{ type: 'Profile'}],
        }),
    }),
});

// Export hooks
export const {
useUpdateProfileGeneralInfoMutation
} = profileApi;
