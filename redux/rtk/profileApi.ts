import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfileByLoginUser: builder.query< void>({
      query: () => "/profile/profileDataById",
    }),
        updateProfileGeneralInfo: builder.mutation({
            query: (formData: FormData) => ({
                url: "/profile/updateGeneralInfo",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error) => [{ type: 'Profile'}],
        }),
        updateProfileEducationInfo: builder.mutation({
            query: (formData: FormData) => ({
                url: "/profile/updateEducation",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error) => [{ type: 'Profile'}],
        }),
    }),
});

// Export hooks
export const {

useUpdateProfileGeneralInfoMutation,
useUpdateProfileEducationInfoMutation,
useGetProfileByLoginUserQuery
} = profileApi;
