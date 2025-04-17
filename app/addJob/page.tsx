"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/Toast";
import { useGetProfileQuery } from "@/redux/rtk/auth";

export const jobTypeCategories = ["Full-time", "Part-time"];

export const Gender = ["Female Only", "Male Only", "Both"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  minSalary: z.preprocess(
    (value) => Number(value),
    z.number().positive("MinSalary must be greater than zero")
  ),
  maxSalary: z.preprocess(
    (value) => Number(value),
    z.number().positive("maxSalary must be greater than zero")
  ),
  vacancy: z.preprocess(
    (value) => Number(value),
    z.number().positive("vacancy must be greater than zero")
  ),
  location: z.string().min(1, "location is required"),
  educationQualification: z
    .string()
    .min(1, "educationQualification is required"),
  experienceLevel: z.preprocess(
    (value) => Number(value),
    z.number().positive("experienceLevel must be greater than zero")
  ),
  requirements: z
    .array(
      z.object({
        title: z.string().min(1, "requirements is required"),
      })
    )
    .min(1, "At least one requirements is required"),
  responsibility: z
    .array(
      z.object({
        title: z.string().min(1, "responsibility is required"),
      })
    )
    .min(1, "At least one responsibility is required"),
  salaryAndBenefits: z
    .array(
      z.object({
        title: z.string().min(1, "salaryAndBenefits is required"),
      })
    )
    .min(1, "At least one salaryAndBenefits is required"),
  skillAndExperience: z
    .array(
      z.object({
        title: z.string().min(1, "skillAndExperience is required"),
      })
    )
    .min(1, "At least one skillAndExperience is required"),

  jobType: z.string().min(1, "jobType is required"),
  gender: z.string().min(1, "gender is required"),
  company: z.string().min(1, "company is required"),
  created_by: z.string().min(1, "created_by is required"),
  datePosted: z
    .string()
    .min(1, "Job post date is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  dateDeadline: z
    .string()
    .min(1, "Job deadline date is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddJobForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { data: user, isLoading } = useGetProfileQuery({});

  console.log("AddJob Theke", user?.data._id);

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
      maxSalary: 0,
      vacancy: 0,
      location: "",
      educationQualification: "",
      experienceLevel: 0,
      requirements: [{ title: "" }],
      responsibility: [{ title: "" }],
      salaryAndBenefits: [{ title: "" }],
      skillAndExperience: [{ title: "" }],
      jobType: "",
      gender: "",
      company: "",
      created_by: "",
      datePosted: "",
      dateDeadline: "",
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

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibility",
  });
  const {
    fields: salaryAndBenefitsFields,
    append: appendSalaryAndBenefits,
    remove: removeSalaryAndBenefits,
  } = useFieldArray({
    control,
    name: "salaryAndBenefits",
  });

  const {
    fields: skillAndExperienceFields,
    append: appendSkillAndExperience,
    remove: removeSkillAndExperience,
  } = useFieldArray({
    control,
    name: "skillAndExperience",
  });

  // const onSubmit = async (data: FormSchema) => {
  //   console.log("data.... :", data);
  //   setLoading(true);
  //   console.log("Form Data:", data);

  //   const formData = new FormData();
  //   // Append simple fields
  //   formData.append("title", data.title);
  //   formData.append("description", data.description);
  //   formData.append("minSalary", data.minSalary.toString());
  //   formData.append("maxSalary", data.maxSalary.toString());
  //   formData.append("vacancy", data.vacancy.toString());
  //   formData.append("location", data.location);
  //   formData.append("educationQualification", data.educationQualification);
  //   formData.append("experienceLevel", data.experienceLevel.toString());
  //   formData.append("jobType", data.jobType);
  //   formData.append("gender", data.gender);
  //   formData.append("datePosted", data.datePosted);
  //   formData.append("dateDeadline", data.dateDeadline);
  //   formData.append("company", data.company);
  //   formData.append("created_by", data.created_by);

  //   // Append array fields
  //   data.requirements.forEach((val, index) => {
  //     formData.append(`requirements[${index}][title]`, val.title);
  //   });
  //   // Append array fields
  //   data.responsibility.forEach((val, index) => {
  //     formData.append(`responsibility[${index}][title]`, val.title);
  //   });
  //   // Append array fields
  //   data.salaryAndBenefits.forEach((val, index) => {
  //     formData.append(`salaryAndBenefits[${index}][title]`, val.title);
  //   });
  //   // Append array fields
  //   data.skillAndExperience.forEach((val, index) => {
  //     formData.append(`skillAndExperience[${index}][title]`, val.title);
  //   });

  //   try {
  //     const response = await fetch("http://localhost:4000/api/v1/job/create", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(
  //         `Request failed with status: ${response.status} - ${response.statusText}`
  //       );
  //     }
  //     const responseData = await response.json();
  //     console.log("Upload Success:", responseData);
  //     successToast("Data submitted successfully");
  //     reset();
  //   } catch (error) {
  //     console.error("Upload Failed:", error);
  //     errorToast("Error Occurred, please try again.", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/v1/job/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Backend Error Response:", responseData);
        throw new Error(responseData.message || "Unknown error occurred");
      }

      successToast("Job posted successfully!");
      reset();
    } catch (error: any) {
      console.error("Upload Failed:", error.message || error);
      errorToast("Error Occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 w-full space-y-6 "
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
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
              <label className="block text-sm font-medium mb-1">Description</label>
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
              <label className="block text-sm font-medium mb-1">Min Salary</label>
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
            {/* maxSalary */}
            <div>
              <label className="block text-sm font-medium mb-1">Max Salary</label>
              <input
                {...register("maxSalary")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter maxSalary"
                type="number"
              />
              {errors.maxSalary && (
                <p className="text-red-500 text-sm text-red">
                  {errors.maxSalary?.message}
                </p>
              )}
            </div>
            {/* maxSalary End*/}
            {/* Vacancy */}
            <div>
              <label className="block text-sm font-medium mb-1">Vacancy</label>
              <input
                {...register("vacancy")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter vacancy"
                type="number"
              />
              {errors.vacancy && (
                <p className="text-red-500 text-sm text-red">
                  {errors.vacancy?.message}
                </p>
              )}
            </div>
            {/* vacancy End*/}

            {/* location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                {...register("location")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm text-red">
                  {errors.location.message}
                </p>
              )}
            </div>
            {/* location End */}

            {/* educationQualification */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Education Qualification
              </label>
              <input
                {...register("educationQualification")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter educationQualification"
              />
              {errors.educationQualification && (
                <p className="text-red-500 text-sm text-red">
                  {errors.educationQualification.message}
                </p>
              )}
            </div>
            {/* educationQualification End */}
            {/* experienceLevel */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Experience Level
              </label>
              <input
                {...register("experienceLevel")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter experienceLevel"
                type="number"
              />
              {errors.experienceLevel && (
                <p className="text-red-500 text-sm text-red">
                  {errors.experienceLevel?.message}
                </p>
              )}
            </div>
            {/* experienceLevel End*/}
            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium mb-1">Requirements</label>
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
            {/* Responsibility */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Responsibility
              </label>
              {responsibilityFields?.map((field, index) => (
                <div key={field.id} className="mb-2 flex items-center gap-4">
                  <div className="flex w-full  flex-col items-start justify-start ">
                    <input
                      {...register(`responsibility.${index}.title`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="responsibility"
                    />

                    {errors.responsibility?.[index]?.title && (
                      <p className="text-red-500 text-sm text-red">
                        {errors.responsibility[index].title?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
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
                  onClick={() => appendResponsibility({ title: "" })}
                  className="flex items-center justify-center gap-x-1 text-slate-500 "
                >
                  <MdOutlinePlaylistAdd size={22} />
                  Add
                </button>
              </div>
            </div>
            {/* responsibility End */}
            {/* salaryAndBenefits */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Salary And Benefits
              </label>
              {salaryAndBenefitsFields?.map((field, index) => (
                <div key={field.id} className="mb-2 flex items-center gap-4">
                  <div className="flex w-full  flex-col items-start justify-start ">
                    <input
                      {...register(`salaryAndBenefits.${index}.title`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="salaryAndBenefits"
                    />

                    {errors.salaryAndBenefits?.[index]?.title && (
                      <p className="text-red-500 text-sm text-red">
                        {errors.salaryAndBenefits[index].title?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSalaryAndBenefits(index)}
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
                  onClick={() => appendSalaryAndBenefits({ title: "" })}
                  className="flex items-center justify-center gap-x-1 text-slate-500 "
                >
                  <MdOutlinePlaylistAdd size={22} />
                  Add
                </button>
              </div>
            </div>
            {/* salaryAndBenefits End */}
            {/* skillAndExperience */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Skill And Experience
              </label>
              {skillAndExperienceFields?.map((field, index) => (
                <div key={field.id} className="mb-2 flex items-center gap-4">
                  <div className="flex w-full  flex-col items-start justify-start ">
                    <input
                      {...register(`skillAndExperience.${index}.title`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="skillAndExperience"
                    />

                    {errors.skillAndExperience?.[index]?.title && (
                      <p className="text-red-500 text-sm text-red">
                        {errors.skillAndExperience[index].title?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSkillAndExperience(index)}
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
                  onClick={() => appendSkillAndExperience({ title: "" })}
                  className="flex items-center justify-center gap-x-1 text-slate-500 "
                >
                  <MdOutlinePlaylistAdd size={22} />
                  Add
                </button>
              </div>
            </div>
            {/* skillAndExperience End */}

            <div>
              <label className="block text-sm font-medium mb-1">Job Type</label>
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
                <p className="text-red-500 text-sm">{errors.jobType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
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
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                {...register("company")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter Company"
              />
              {errors.company && (
                <p className="text-red-500 text-sm text-red">
                  {errors.company.message}
                </p>
              )}
            </div>
            {/* Company End */}
            {/* created_by */}
            <div>
              <label className="block text-sm font-medium mb-1">Created_by</label>
              <input
                {...register("created_by")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter created_by"
              />
              {errors.created_by && (
                <p className="text-red-500 text-sm text-red">
                  {errors.created_by.message}
                </p>
              )}
            </div>
            {/* created_by End */}
            {/* date Posted  */}
            <div>
              <label className="block text-sm font-medium mb-1">Job Post Date</label>
              <div>
                <input
                  type="date"
                  {...register("datePosted")}
                  className="border rounded-md p-2 w-full"
                />
                {errors.datePosted && (
                  <p className="text-red-500 text-sm">
                    {errors.datePosted.message}
                  </p>
                )}
              </div>
            </div>
            {/* date Posted */}
            {/* deadline date  */}
            <div>
              <label className="block text-sm font-medium mb-1">Job Deadline Date</label>
              <div>
                <input
                  type="date"
                  {...register("dateDeadline")}
                  className="border rounded-md p-2 w-full"
                />
                {errors.dateDeadline && (
                  <p className="text-red-500 text-sm">
                    {errors.dateDeadline.message}
                  </p>
                )}
              </div>
            </div>
            {/* date Posted */}

            <div className="flex w-full items-center justify-center ">
              <Button className="w-full bg-secondary-1 hover:bg-orange-600">POST JOB</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
