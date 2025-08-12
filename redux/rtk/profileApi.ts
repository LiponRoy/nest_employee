import { EducationResponse, GeneralInfoResponse, ProfileResponse } from "@/constant/Constant";
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
     // In your API slice:
updateProfileEducationInfo: builder.mutation<EducationResponse, FormData>({
  query: (formData) => ({
    url: "/profile/updateEducation",
    method: "PUT",
    body: formData,
  }),
  invalidatesTags: (result, error) => [{ type: "Profile" }],
}),
        getProfileByLoginUser: builder.query<ProfileResponse,void>({
            query: () => "/profile/profileDataById",
        }),
        getEducationByLoginUser: builder.query<EducationResponse,void>({
            query: () => "/profile/educationDataByLoginUser/",
        }),
        getGeneralInfoByLoginUser: builder.query<GeneralInfoResponse,void>({
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
