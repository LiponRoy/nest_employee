"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/Toast";
import { useGetEducationByLoginUserQuery, useUpdateProfileEducationInfoMutation } from "@/redux/rtk/profileApi";

const formSchema = z.object({
  education: z
    .array(
      z.object({
        instituteName: z.string().min(1, "instituteName is required"),
        degree: z.string().min(1, "Degree is required"),
        cgpa: z.string().min(1, "Cgpa is required"),
        passingYear: z.string().min(1, "PassingYear is required"),
      })
    )
    .min(1, "At least one education is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const UpdateEducationInfo: React.FC = () => {
     const [updateProfileEducationInfo, { isLoading }] = useUpdateProfileEducationInfoMutation();

     // for getting profile education data to auto fill 
      const { data: profileData, isLoading: isProfileLoading } = useGetEducationByLoginUserQuery();
  
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      education: [{ instituteName: "", degree: "", cgpa: "" , passingYear: "" }],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  // Auto-fill form when profile data arrives
  useEffect(() => {
    if (profileData?.data?.education && profileData.data.education.length > 0) {
      reset({ education: profileData.data.education });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: FormSchema) => {
    try {
      const formData = new FormData();
      formData.append("education", JSON.stringify(data.education));
      await updateProfileEducationInfo(formData).unwrap();
      successToast("Education Info Update Successfully");
    } catch (err) {
      errorToast("Something went wrong !!");
      console.error("Education Info Update Failed", err);
    }
  };

  if (isProfileLoading) {
  return (
    <div className="flex justify-center items-center h-40">
      <p>Loading education info...</p>
    </div>
  );
}

  return (
    <div className="w-full flex justify-start items-start">
      <div className="w-full flex items-center justify-center bg-white px-2">
        <div className="w-full">
          <h4 className="text-xl font-semibold my-1 bg-slate-200 p-1">
          Update Education Info
          </h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 w-full space-y-6"
          >
            {/* Responsibility Section */}
            <div>
              {educationFields.map((field, index) => (
                <div key={field.id} className="mb-4 p-3 border rounded">
                  {/* instituteName */}
                  <div className="mb-2">
                    <input
                      {...register(`education.${index}.instituteName`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="instituteName"
                    />
                    {errors.education?.[index]?.instituteName && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].instituteName?.message}
                      </p>
                    )}
                  </div>

                  {/* degree */}
                  <div className="mb-2">
                    <textarea
                      {...register(`education.${index}.degree`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="degree"
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].degree?.message}
                      </p>
                    )}
                  </div>

                  {/* cgpa */}
                  <div className="mb-2">
                    <input
                      {...register(`education.${index}.cgpa`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="cgpa"
                    />
                    {errors.education?.[index]?.cgpa && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].cgpa?.message}
                      </p>
                    )}
                  </div>
                  {/* passingYear */}
                  <div className="mb-2">
                    <input
                      {...register(`education.${index}.passingYear`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="passingYear"
                    />
                    {errors.education?.[index]?.passingYear && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].passingYear?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 flex items-center mt-1"
                  >
                    <FiDelete size={20} className="mr-1" />
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() =>
                    appendEducation({
                      instituteName: "",
                      degree: "",
                      cgpa: "",
                      passingYear: "",
                    })
                  }
                  className="flex items-center gap-1 text-slate-500"
                >
                  <MdOutlinePlaylistAdd size={22} />
                  Add More Education Info
                </button>
              </div>
            </div>
            {/* End Responsibility */}

            <div className="flex w-full items-center justify-center ">
  <Button
    type="submit"
    className="w-full bg-secondary-1 hover:bg-orange-600"
    disabled={isLoading}
  >
    {isLoading ? "Updating..." : "Update Education Info"}
  </Button>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEducationInfo;
