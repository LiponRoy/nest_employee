"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/Toast";
import { useGetProfileQuery } from "@/redux/rtk/auth";
import { useCreateCompanyMutation } from "@/redux/rtk/companyApi";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  about: z.string().min(1, "About is required"),
  location: z.string().min(1, "Location is required"),
  teamMember: z.preprocess((value) => Number(value), z.number().positive("Team Member must be greater than zero")),
  officeBranches: z.preprocess(
    (value) => Number(value),
    z.number().positive("Office Branches must be greater than zero")
  ),
  FoundedDate: z.string().min(1, "Founded Date is required"),
  logoImage: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "File is required",
    })
    .refine((files) => files[0]?.type === "image/jpeg" || files[0]?.type === "image/png", {
      message: "Only JPEG or PNG images are allowed",
    })
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddCompanyForm: React.FC = () => {
  const [createCompany, { isLoading, isSuccess, isError, error }] = useCreateCompanyMutation();
  const { data: currentUser, isLoading: profileLoading } = useGetProfileQuery({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      title: "",
      about: "",
      location: "",
      teamMember: 0,
      officeBranches: 0,
      FoundedDate: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      successToast("Company created successfully!");
      reset();
    }
    if (isError) {
      errorToast("Company creation failed");
      console.error("Error:", error);
    }
  }, [isSuccess, isError, error, reset]);

  const onSubmit = async (data: FormSchema) => {
    if (!currentUser?.data._id) {
      errorToast("You are not logged in");
      return;
    }

    const payload = { ...data, creator: currentUser?.data._id };
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "logoImage") {
        formData.append(key, (value as FileList)[0]);
      } else {
        formData.append(key, value.toString());
      }
    });

    await createCompany(formData);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex items-center justify-center bg-white p-2">
        <div className="w-full">
          <h4 className="text-2xl font-semibold my-2 bg-slate-200 p-2">Add Company</h4>
          {profileLoading && <p>Loading profile...</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="mb-10 w-full space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                {...register("name")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register("title")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            {/* About */}
            <div>
              <label className="block text-sm font-medium mb-1">About</label>
              <input
                {...register("about")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter about"
              />
              {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                {...register("location")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter location"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>
            {/* Team Member */}
            <div>
              <label className="block text-sm font-medium mb-1">Team Member</label>
              <input
                {...register("teamMember")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter team member"
                type="number"
              />
              {errors.teamMember && <p className="text-red-500 text-sm">{errors.teamMember.message}</p>}
            </div>
            {/* Office Branches */}
            <div>
              <label className="block text-sm font-medium mb-1">Office Branches</label>
              <input
                {...register("officeBranches")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter office branches"
                type="number"
              />
              {errors.officeBranches && <p className="text-red-500 text-sm">{errors.officeBranches.message}</p>}
            </div>
            {/* Founded Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Founded Date</label>
              <input
                {...register("FoundedDate")}
                className="border-gray-300 w-full rounded border p-2"
                placeholder="Enter Founded Date"
              />
              {errors.FoundedDate && <p className="text-red-500 text-sm">{errors.FoundedDate.message}</p>}
            </div>
            {/* Logo Image */}
            <div>
              <label className="block text-sm font-medium mb-1">Logo Image</label>
              <input {...register("logoImage")} type="file" className="border-gray-300 w-full rounded border p-2" />
              <p className="text-red-500 text-sm">{errors.logoImage?.message?.toString()}</p>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button className="w-full bg-secondary-1 hover:bg-orange-600" disabled={isLoading || profileLoading}>
                {isLoading ? "Creating..." : "Add Company"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyForm;
