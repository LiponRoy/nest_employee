"use client";
import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdOutlinePlaylistAdd,
} from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/Toast";

 
export const jobTypeCategories = [
	"Full-time",
	"Part-time",
  ];

export const Gender = [
	"Female",
	"male",
	"Other",
  ];

 
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  minSalary: z.preprocess(
    (value) => Number(value),
    z.number().positive("MinSalary must be greater than zero"),
  ),
  requirements: z
    .array(
      z.object({
        title: z.string().min(1, "requirements is required"),
      }),
    )
    .min(1, "At least one requirements is required"),
    jobType: z.string().min(1, "jobType is required"),
    gender: z.string().min(1, "gender is required"),

});
 
type FormSchema = z.infer<typeof formSchema>;
 
const DynamicForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
 
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      minSalary: 0,
      requirements: [{ title: "" }],
      jobType: "",
      gender: "",
    },
  });
 
  const {
    fields: requirementsFields,
    append: appendRequirements,
    remove: removeRequirements,
  } = useFieldArray({
    control,
    name: "requirements",
  });
 
  const onSubmit = async (data: FormSchema) => {
    console.log("data.... :", data);
    setLoading(true);
    console.log("Form Data:", data);
 
    const formData = new FormData();
 
    // Append simple fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("minSalary", data.minSalary.toString());
    formData.append("jobType", data.jobType);
    formData.append("gender", data.gender);
 
    // Append array fields
    data.requirements.forEach((requirement, index) => {
      formData.append(`requirements[${index}][title]`, requirement.title);
    });
 
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/package/create`,
        {
          method: "POST",
          body: formData,
        },
      );
 
      if (!response.ok) {
        throw new Error(
          `Request failed with status: ${response.status} - ${response.statusText}`,
        );
      }
      const responseData = await response.json();
      console.log("Upload Success:", responseData);
      successToast("Data submitted successfully");
      reset();
    } catch (error) {
      console.error("Upload Failed:", error);
      errorToast("Error Occurred, please try again.", error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="">
      <div className="">
        <div className=" flex items-center justify-center bg-white p-6">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-10 w-full space-y-6 "
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  {...register("title")}
                  className="border-gray-300 w-full rounded border p-2"
                  placeholder="Enter title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm text-red">
                    {errors.title.message}
                  </p>
                )}
              </div>
              {/* Title End */}
              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  {...register("description")}
                  className="border-gray-300 w-full rounded border p-2"
                  placeholder="Enter description text"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm text-red">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* Description End */}
              {/* MinSalary */}
              <div>
                <label className="block text-sm font-medium">MinSalary</label>
                <input
                  {...register("minSalary")}
                  className="border-gray-300 w-full rounded border p-2"
                  placeholder="Enter minSalary"
                  type="number"
                />
                {errors.minSalary && (
                  <p className="text-red-500 text-sm text-red">
                    {errors.minSalary?.message}
                  </p>
                )}
              </div>
              {/* MinSalary End*/}
              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium">Requirements</label>
                {requirementsFields?.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center gap-4">
                    <div className="flex w-full  flex-col items-start justify-start ">
                      <input
                        {...register(`requirements.${index}.title`)}
                        className="border-gray-300 w-full rounded border p-2"
                        placeholder="requirements"
                      />
 
                      {errors.requirements?.[index]?.title && (
                        <p className="text-red-500 text-sm text-red">
                          {errors.requirements[index].title?.message}
                        </p>
                      )}
                    </div>
 
                    <button
                      type="button"
                      onClick={() => removeRequirements(index)}
                      className="text-red-500"
                    >
                      {/* remove btn */}
                      <FiDelete className="text-slate-400" size={24} />
                    </button>
                  </div>
                ))}
                <div className=" is flex justify-start">
                  <button
                    type="button"
                    onClick={() => appendRequirements({ title: "" })}
                    className="flex items-center justify-center gap-x-1 text-slate-500 "
                  >
                    <MdOutlinePlaylistAdd size={22} />
                    Add
                  </button>
                </div>
              </div>
              {/* Requirements End */}

 
              <div>
                <label className="block text-sm font-medium">jobType</label>
                <select
                  {...register("jobType")}
                  className="border-gray-300 w-full rounded border p-2"
                >
                  <option value="">Select a jobType</option>
                  {jobTypeCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm">
                    {errors.jobType.message}
                  </p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  {...register("gender")}
                  className="border-gray-300 w-full rounded border p-2"
                >
                  <option value="">Select a gender</option>
                  {Gender.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
             

 
              <div className="flex w-full items-center justify-center ">
                <Button
                  // isDisabled={loading}
                  // btnType="submit"
                  title={loading ? "Loading ...." : "Submit Here"}
                  // containerStyles={`${loading ? "bg-slate-400" : "bg-orange-deep"} w-1/2 p-2 text-white uppercase rounded-md`}
                />
              </div>
              <div className=" text-slate-500">
                Note : Same title and more or less than 4 images are not
                permitted.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DynamicForm;