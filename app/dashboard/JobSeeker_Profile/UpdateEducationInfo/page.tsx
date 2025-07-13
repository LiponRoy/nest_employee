"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/Toast";
import { useUpdateProfileEducationInfoMutation } from "@/redux/rtk/profileApi";

// 1️⃣ Zod schema updated
const formSchema = z.object({
  responsibility: z
    .array(
      z.object({
        instituteName: z.string().min(1, "instituteName is required"),
        degree: z.string().min(1, "Degree is required"),
        cgpa: z.string().min(1, "Cgpa is required"),
        passingYear: z.string().min(1, "PassingYear is required"),
      })
    )
    .min(1, "At least one responsibility is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const UpdateEducationInfo: React.FC = () => {
     const [updateProfileEducationInfo, { isLoading, error }] = useUpdateProfileEducationInfoMutation();
  
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
      responsibility: [{ instituteName: "", degree: "", cgpa: "" , passingYear: "" }],
    },
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibility",
  });

  const onSubmit = async (data: FormSchema) => {
    console.log("data xx :", data);
    const formData = new FormData();

    data.responsibility.forEach((res, index) => {
      formData.append(`responsibility[${index}][instituteName]`, res.instituteName);
      formData.append(`responsibility[${index}][degree]`, res.degree);
      formData.append(`responsibility[${index}][cgpa]`, res.cgpa);
      formData.append(`responsibility[${index}][passingYear]`, res.passingYear);
    });

     try {
               await updateProfileEducationInfo(formData).unwrap();
               successToast("Education Info Update Successfully")
             } catch (err) {
               errorToast("Something went wrong !!", err)
               console.error("Education Info Update Failed", err);
             }
  };

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
              {responsibilityFields.map((field, index) => (
                <div key={field.id} className="mb-4 p-3 border rounded">
                  {/* instituteName */}
                  <div className="mb-2">
                    <input
                      {...register(`responsibility.${index}.instituteName`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="instituteName"
                    />
                    {errors.responsibility?.[index]?.instituteName && (
                      <p className="text-red-500 text-sm">
                        {errors.responsibility[index].instituteName?.message}
                      </p>
                    )}
                  </div>

                  {/* degree */}
                  <div className="mb-2">
                    <textarea
                      {...register(`responsibility.${index}.degree`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="degree"
                    />
                    {errors.responsibility?.[index]?.degree && (
                      <p className="text-red-500 text-sm">
                        {errors.responsibility[index].degree?.message}
                      </p>
                    )}
                  </div>

                  {/* cgpa */}
                  <div className="mb-2">
                    <input
                      {...register(`responsibility.${index}.cgpa`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="cgpa"
                    />
                    {errors.responsibility?.[index]?.cgpa && (
                      <p className="text-red-500 text-sm">
                        {errors.responsibility[index].cgpa?.message}
                      </p>
                    )}
                  </div>
                  {/* passingYear */}
                  <div className="mb-2">
                    <input
                      {...register(`responsibility.${index}.passingYear`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="passingYear"
                    />
                    {errors.responsibility?.[index]?.passingYear && (
                      <p className="text-red-500 text-sm">
                        {errors.responsibility[index].passingYear?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
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
                    appendResponsibility({
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
              <Button className="w-full bg-secondary-1 hover:bg-orange-600">
                Update Education Info
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEducationInfo;
