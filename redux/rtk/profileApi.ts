import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        updateProfileGeneralInfo: builder.mutation({
            query: (formData: FormData) => ({
                url: "/profile/updateGeneralInfo",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error) => [{ type: "Profile" }],
        }),
        updateProfileEducationInfo: builder.mutation({
            query: (formData: FormData) => ({
                url: "/profile/updateEducation",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error) => [{ type: "Profile" }],
        }),
        getProfileByLoginUser: builder.query<void>({
            query: () => "/profile/profileDataById",
        }),
        getEducationByLoginUser: builder.query<void>({
            query: () => "/profile/educationDataByLoginUser/",
        }),
        getGeneralInfoByLoginUser: builder.query<void>({
            query: () => "/profile/generalInfoDataByLoginUser/",
        }),
    }),
});

// Export hooks
export const {
    useUpdateProfileGeneralInfoMutation,
    useUpdateProfileEducationInfoMutation,
    useGetProfileByLoginUserQuery,
    useGetEducationByLoginUserQuery,
    useGetGeneralInfoByLoginUserQuery
} = profileApi;
