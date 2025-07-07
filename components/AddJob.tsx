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
import { useCreateJobsMutation } from "@/redux/rtk/jobsApi";
import { useGetCompanyNamesByCreatorQuery } from "@/redux/rtk/companyApi";
import {
  bangladeshDivisions,
  categories,
  Gender,
  jobType,
} from "@/constant/Constant";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
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

  minSalary: z.preprocess(
    (value) => Number(value),
    z.number().positive("MinSalary must be greater than zero")
  ),
  maxSalary: z.preprocess(
    (value) => Number(value),
    z.number().positive("maxSalary must be greater than zero")
  ),
  experienceLevel: z.preprocess(
    (value) => Number(value),
    z.number().positive("experienceLevel must be greater than zero")
  ),
  location: z.string().min(1, "location is required"),
  division: z.string().min(1, "city is required"),
  jobType: z.string().min(1, "jobType is required"),
  category: z.string().min(1, "category is required"),
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

  vacancy: z.preprocess(
    (value) => Number(value),
    z.number().positive("vacancy must be greater than zero")
  ),
  educationQualification: z
    .string()
    .min(1, "educationQualification is required"),

  gender: z.string().min(1, "gender is required"),
  companyName: z.string().min(1, "companyName is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const AddJobForm: React.FC = () => {
  // Job Create RTK
  const [createJob, { isLoading, isSuccess, error }] = useCreateJobsMutation();
  // Profile for current user RTK
  const { data: currentUser, isLoading: profileLoading } = useGetProfileQuery(
    {}
  );

  // getting all company name by creator
  const {
    data: companyNamesArray,
    error: companyError,
    isLoading: companyLoading,
  } = useGetCompanyNamesByCreatorQuery();

  console.log("companyNames:", companyNamesArray);

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
      title: "",
      description: "",
      requirements: [{ title: "" }],
      responsibility: [{ title: "" }],
      salaryAndBenefits: [{ title: "" }],
      skillAndExperience: [{ title: "" }],
      minSalary: 0,
      maxSalary: 0,
      experienceLevel: 0,
      location: "",
      division: "",
      jobType: "",
      category: "",
      datePosted: "",
      dateDeadline: "",
      vacancy: 0,
      educationQualification: "",
      gender: "",
      companyName: "",
      // created_by: '',
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

  const onSubmit = async (data: FormSchema) => {
    if (!currentUser?.data._id) {
      errorToast("Your are not loged in");
      return;
    }

    const payload = {
      ...data,
      created_by: currentUser?.data._id, //  filled current User
    };

    const formData = new FormData();

    // Append simple fields
    formData.append("title", payload.title);
    formData.append("description", payload.description);

    payload.requirements.forEach((requirements, index) => {
      formData.append(`requirements[${index}][title]`, requirements.title);
    });
    payload.responsibility.forEach((responsibility, index) => {
      formData.append(`responsibility[${index}][title]`, responsibility.title);
    });
    payload.salaryAndBenefits.forEach((salaryAndBenefits, index) => {
      formData.append(
        `salaryAndBenefits[${index}][title]`,
        salaryAndBenefits.title
      );
    });
    payload.skillAndExperience.forEach((skillAndExperience, index) => {
      formData.append(
        `skillAndExperience[${index}][title]`,
        skillAndExperience.title
      );
    });

    formData.append("minSalary", payload.minSalary.toString());
    formData.append("maxSalary", payload.maxSalary.toString());
    formData.append("experienceLevel", payload.experienceLevel.toString());

    formData.append("location", payload.location);
    formData.append("division", payload.division);
    formData.append("jobType", payload.jobType);
    formData.append("category", payload.category);
    formData.append("datePosted", payload.datePosted);
    formData.append("dateDeadline", payload.dateDeadline);
    formData.append("vacancy", payload.vacancy.toString());
    formData.append("educationQualification", payload.educationQualification);
    formData.append("gender", payload.gender);
    formData.append("companyName", payload.companyName);
    formData.append("created_by", payload.created_by);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const result = await createJob(formData).unwrap();
      console.log("result :", result);
      successToast("Job created successfully!");
      reset();
    } catch (err) {
      console.log(err);
      errorToast("Job creation failed");
    }
  };

  return (
    <div className="w-full flex justify-start items-start">
      <div className="w-full flex items-center justify-center bg-white px-2">
        <div className="w-full">
          <h4 className="text-2xl font-semibold my-2 bg-slate-200 p-2">
            Add New Job .
          </h4>
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
            {/* Description  */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
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
            <div className="w-full flex justify-between items-center space-x-1">
              {/* MinSalary */}
              <div>
                <label className=" text-sm font-medium mb-1 ">Min Salary</label>
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
                <label className=" text-sm font-medium mb-1">Max Salary</label>
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
                <label className=" text-sm font-medium mb-1">Vacancy</label>
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
            </div>

            {/* location */}
            <div>
              <label className=" text-sm font-medium mb-1">Location</label>
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

            {/* Division */}
            <div>
              <label className="text-sm font-medium mb-1 block">Division</label>
              <select
                {...register("division")}
                className="border-gray-300 w-full rounded border p-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a division
                </option>
                {bangladeshDivisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-red-500 text-sm">
                  {errors.division.message}
                </p>
              )}
            </div>
            {/* Division End */}

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
              <label className="block text-sm font-medium mb-1">
                Requirements
              </label>
              {requirementsFields.map((field, index) => (
                <div key={field.id} className="mb-2 flex items-center gap-4">
                  <div className="flex w-full flex-col">
                    <input
                      {...register(`requirements.${index}.title` as const)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="Requirement"
                      defaultValue={field.title} // ✨ important
                    />
                    {errors.requirements?.[index]?.title && (
                      <p className="text-red-500 text-sm">
                        {errors.requirements[index]?.title?.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRequirements(index)}
                  >
                    <FiDelete size={20} className="text-red-400" />
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
                      defaultValue={field.title}
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
                      defaultValue={field.title}
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
                  <div className="flex w-full flex-col items-start justify-start">
                    <input
                      {...register(`skillAndExperience.${index}.title`)}
                      className="border-gray-300 w-full rounded border p-2"
                      placeholder="Skill and experience"
                      defaultValue={field.title}
                    />
                    {errors.skillAndExperience?.[index]?.title && (
                      <p className="text-red-500 text-sm">
                        {errors.skillAndExperience[index].title?.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkillAndExperience(index)}
                    className="text-red-500"
                  >
                    <FiDelete className="text-slate-400" size={24} />
                  </button>
                </div>
              ))}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => appendSkillAndExperience({ title: "" })}
                  className="flex items-center justify-center gap-x-1 text-slate-500"
                >
                  <MdOutlinePlaylistAdd size={22} />
                  Add
                </button>
              </div>
            </div>
            {/* skillAndExperience End */}
            <div className="flex justify-between items-center space-x-2 my-2">
              {/* Job Type */}
              <div className="w-full">
                <label className=" text-sm font-medium mb-1">Job Type</label>
                <select
                  {...register("jobType")}
                  className="border-gray-300 w-full rounded border p-2"
                >
                  <option value="">Select a jobType</option>
                  {jobType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm">
                    {errors.jobType.message}
                  </p>
                )}
              </div>
              {/* Job Type End */}
              {/* Job category */}
              <div className="w-full">
                <label className=" text-sm font-medium mb-1">
                  Job Category
                </label>
                <select
                  {...register("category")}
                  className="border-gray-300 w-full rounded border p-2"
                >
                  <option value="">Select a Category</option>
                  {categories?.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              {/*  Job category End */}

              <div className="w-full">
                <label className=" text-sm font-medium mb-1">Gender</label>
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
            </div>
            <div className="flex justify-between items-center space-x-2 space-y-4">
              {/* Company */}
              <div className="w-full">
                <label className=" text-sm font-medium">company Name</label>
                <select
                  {...register("companyName")}
                  className="border-gray-300 w-full rounded border p-2"
                >
                  <option value="">Select Company </option>
                  {companyNamesArray?.data?.map((company: string) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
                {errors.companyName && (
                  <p className="text-red-500 text-sm text-red">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              {/* Company End */}

              {/* date Posted  */}
              <div className="w-full">
                <label className=" text-sm font-medium mb-1">
                  Job Post Date
                </label>
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
              <div className="w-full">
                <label className="w-full text-sm font-medium mb-1">
                  Job Deadline Date
                </label>
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
            </div>

            <div className="flex w-full items-center justify-center ">
              <Button className="w-full bg-secondary-1 hover:bg-orange-600">
                POST JOB
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
